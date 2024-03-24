import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { KhaltiPaymentDto } from './dto/KahltiPaymentDto';
import { KhaltiLookupPaymentDto } from './dto/KhaltiLookupPaymentDto';

@Injectable()
export class KhaltiService {
  constructor(private readonly httpService: HttpService) {}
  async initiateKhaltiPayment(initiatePaymentDto: KhaltiPaymentDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.KHALTI_URL}/epayment/initiate/`,
          {
            ...initiatePaymentDto,
          },
          {
            headers: {
              Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }

  async lookupKhaltiPayment(lookupPaymentDto: KhaltiLookupPaymentDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.KHALTI_URL}/epayment/lookup/`,
          { pidx: lookupPaymentDto.pidx },
          {
            headers: {
              Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
