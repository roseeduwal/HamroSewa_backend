import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeParamDto } from '../../lib/utils/UserTypeParamDto';
import { UserRole } from '../user/entities/UserRole.Enum';
import { Booking } from './entities/Booking.Entity';

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
      return this.findOne(newBooking.id);
    } catch (err) {
      return null;
    }
  }

  async findOne(id: number) {
    return this.repository
      .createQueryBuilder('b')
      .where('b.id = :id', { id })
      .leftJoinAndSelect('b.bookingItems', 'bookingItems')
      .leftJoinAndSelect('bookingItems.product', 'product')
      .getOne();
  }

  async find(userType: UserTypeParamDto, userId: number) {
    const query = this.repository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.bookingItems', 'bookingItems')
      .leftJoinAndSelect('bookingItems.product', 'product')
      .leftJoinAndSelect('b.professional', 'professional')
      .leftJoinAndSelect('b.payment', 'payment')
      .leftJoinAndSelect('professional.user', 'professionalUser');
    if (userType.userType === UserRole.User) {
      query.where('b.userId = :userId', { userId });
    } else {
      query.leftJoinAndSelect('b.user', 'user');
    }

    return query.getMany();
  }

  async update(booking: Partial<Booking>) {
    try {
      const preloaded = await this.repository.preload({ ...booking });
      const update = await this.repository.save({ ...preloaded });
      if (!update) return null;

      return update;
    } catch (err) {
      return null;
    }
  }
}
