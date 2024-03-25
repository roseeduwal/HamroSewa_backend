import { Module } from '@nestjs/common';
import { BookingModule } from '../booking/Booking.Module';
import { PaymentModule } from '../payment/Payment.Module';
import { UserModule } from '../user/User.Module';
import { UserEventListenerService } from './UserEventListener.Service';

@Module({
  imports: [UserModule, BookingModule, PaymentModule],
  providers: [UserEventListenerService],
  exports: [UserEventListenerService],
})
export class EventListenerModule {}
