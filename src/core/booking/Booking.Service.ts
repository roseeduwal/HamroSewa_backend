import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CartItemService } from '../cart-item/CartItem.Service';
import { BookingRepository } from './Booking.Repository';
import { CreateBookingDto } from './dto/CreateBookingDto';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly cartItemService: CartItemService,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: number) {
    try {
      const newBooking = await this.bookingRepository.create({
        ...createBookingDto,
        userId,
      });
      if (!newBooking) throw new BadRequestException();

      await this.cartItemService.deleteBy(userId);
      return newBooking;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
