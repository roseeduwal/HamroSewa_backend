import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { BookingItems } from '../../booking-item/entities/BookingItem.Entity';
import { PaymentMode } from '../../payment/entities/PaymentMode.Enum';

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

  @IsEnum(PaymentMode)
  @IsOptional()
  paymentMode?: PaymentMode;
}
