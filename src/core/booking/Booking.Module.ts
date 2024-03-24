import { Module } from '@nestjs/common';
import { CartItemModule } from '../cart-item/CartItem.Module';
import { PaymentModule } from '../payment/Payment.Module';
import { ProductModule } from '../product/Product.Module';
import { BookingController } from './Booking.Controller';
import { BookingRepository } from './Booking.Repository';
import { BookingService } from './Booking.Service';
import { BookingDIToken } from './BookingDIToken';

@Module({
  imports: [
    BookingDIToken.bookingEntity,
    CartItemModule,
    ProductModule,
    PaymentModule,
  ],
  providers: [BookingService, BookingRepository],
  controllers: [BookingController],
})
export class BookingModule {}
