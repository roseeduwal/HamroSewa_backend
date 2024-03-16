import { Module } from '@nestjs/common';
import { CartItemModule } from '../cart-item/CartItem.Module';
import { BookingController } from './Booking.Controller';
import { BookingRepository } from './Booking.Repository';
import { BookingService } from './Booking.Service';
import { BookingDIToken } from './BookingDIToken';

@Module({
  imports: [BookingDIToken.bookingEntity, CartItemModule],
  providers: [BookingService, BookingRepository],
  controllers: [BookingController],
})
export class BookingModule {}
