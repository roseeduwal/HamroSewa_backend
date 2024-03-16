import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { BookingItems } from '../../booking-item/entities/BookingItem.Entity';

export class CreateBookingDto {
  @IsNotEmpty()
  @ApiProperty()
  subTotal: number;

  @IsNotEmpty()
  @ApiProperty()
  bookingDate: Date;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  bookingItems: BookingItems[];
}
