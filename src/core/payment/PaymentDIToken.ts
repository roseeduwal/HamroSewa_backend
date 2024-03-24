import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/Payment.Entity';

export class PaymentDIToken {
  static readonly paymentEntity = TypeOrmModule.forFeature([Payment]);
}
