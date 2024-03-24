import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateBookingDto } from './CreateBookingDto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiProperty()
  @IsOptional()
  professionalId?: number;
}
