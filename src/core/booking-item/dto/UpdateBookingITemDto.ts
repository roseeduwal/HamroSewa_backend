import { PartialType } from '@nestjs/swagger';
import { CreateBookingItemDto } from './CreateBookingItemDto';

export class UpdateBookingItemDto extends PartialType(CreateBookingItemDto) {}
