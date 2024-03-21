import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../user/entities/UserRole.Enum';
import { Booking } from './entities/Booking.Entity';
import { UserTypeParamDto } from './entities/UserTypePramDto';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(Booking) private readonly repository: Repository<Booking>,
  ) {}

  async create(booking: Partial<Booking>) {
    try {
      const newBooking = await this.repository.save(
        this.repository.create(booking),
      );
      if (!newBooking) return null;
      return newBooking;
    } catch (err) {
      return null;
    }
  }

  async find(userType: UserTypeParamDto, userId: number) {
    const query = this.repository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.bookingItems', 'bookingItems')
      .leftJoinAndSelect('bookingItems.product', 'product')
      .leftJoin('b.user', 'user');

    if (userType.userType === UserRole.User) {
      query.where('b.userId = :userId', { userId });
    }

    return query.getMany();
  }
}
