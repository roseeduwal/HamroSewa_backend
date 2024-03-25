import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BookingService } from '../booking/Booking.Service';
import { PaymentService } from '../payment/Payment.Service';
import { User } from '../user/entities/User.Entity';

export const USER_DELETE = 'user.event.delete';

@Injectable()
export class UserEventListenerService {
  constructor(
    private readonly bookingService: BookingService,
    private readonly paymentService: PaymentService,
  ) {}

  @OnEvent(USER_DELETE, { async: true })
  async deleteBookingAndPayment(user: User) {
    await this.bookingService.deleteMultiple({ userId: user.id });
    await this.paymentService.deleteMultiple({ userId: user.id });
  }
}
