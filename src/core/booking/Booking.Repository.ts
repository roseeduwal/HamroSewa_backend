import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      return newBooking;
    } catch (err) {
      return null;
    }
  }
}
