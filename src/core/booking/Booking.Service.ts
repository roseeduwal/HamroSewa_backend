import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartItemService } from '../cart-item/CartItem.Service';
import { BookingRepository } from './Booking.Repository';
import { CreateBookingDto } from './dto/CreateBookingDto';
import { UserTypeParamDto } from './entities/UserTypePramDto';

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

  async fetch(userType: UserTypeParamDto, userId: number) {
    try {
      const bookings = await this.bookingRepository.find(userType, userId);
      if (!bookings) throw new NotFoundException();
      return bookings;
    } catch (err) {
      console.log(err);
      throw new HttpException('Something went wrong', 500);
    }
  }
}
