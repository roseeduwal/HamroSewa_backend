import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/Booking.Entity';

export class BookingDIToken {
  static readonly bookingEntity = TypeOrmModule.forFeature([Booking]);
}
