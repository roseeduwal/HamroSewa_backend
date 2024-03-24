import { Module } from '@nestjs/common';
import { KhaltiModule } from '../../infra/khalti/Khalti.Module';
import { PaymentController } from './Payment.Controller';
import { PaymentRepository } from './Payment.Repository';
import { PaymentService } from './Payment.Service';
import { PaymentDIToken } from './PaymentDIToken';

@Module({
  imports: [PaymentDIToken.paymentEntity, KhaltiModule],
  providers: [PaymentService, PaymentRepository],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
