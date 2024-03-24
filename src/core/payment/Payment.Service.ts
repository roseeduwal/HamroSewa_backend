import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KhaltiService } from '../../infra/khalti/Khalti.Service';
import uuidv4 from '../../lib/utils/uuidv4';
import { PaymentRepository } from './Payment.Repository';
import { CreatePaymentDto } from './dto/CreatePaymentDto';
import { ValidatePaymentDto } from './dto/ValidatePaymentDto';
import { PaymentMode } from './entities/PaymentMode.Enum';
import { PaymentStatus } from './entities/PaymentStatus.Enum';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly khaltiService: KhaltiService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const newPayment = await this.paymentRepository.create({
        ...createPaymentDto,
      });

      if (!newPayment) throw new BadRequestException();

      if (newPayment.paymentMode === PaymentMode.Online) {
        const response = await this.khaltiService.initiateKhaltiPayment({
          amount: newPayment.priceInCents,
          purchase_order_id: uuidv4(),
          purchase_order_name: newPayment.user.firstName,
          return_url: `${process.env.FE_APP}/purchase`,
          website_url: process.env.FE_APP,
        });

        await this.paymentRepository.create({
          ...newPayment,
          pidx: response.pidx,
        });
        return response.data;
      }
      return newPayment;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async validate(validate: ValidatePaymentDto) {
    try {
      const payment = await this.paymentRepository.findBy({
        pidx: validate.pidx,
      });
      if (!payment) throw new NotFoundException('Payment not found');

      const response = await this.khaltiService.lookupKhaltiPayment({
        pidx: payment.pidx,
      });

      if (!response) {
        return this.paymentRepository.update({
          ...payment,
          paymentStatus: PaymentStatus.Error,
        });
      } else {
        return this.paymentRepository.update({
          ...payment,
          paymentStatus: PaymentStatus.Done,
        });
      }
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
