import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { BookingItems } from '../../booking-item/entities/BookingItem.Entity';
import { User } from '../../user/entities/User.Entity';

@Entity('bookings')
export class Booking extends CoreEntity {
  @ManyToOne(() => User, (user) => user.booking)
  user: User;

  @ApiProperty()
  @Column({ type: 'number' })
  userId: number;

  @OneToMany(() => BookingItems, (orderItem) => orderItem.booking, {
    cascade: true,
  })
  bookingItems: BookingItems[];

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  subTotal: number;

  @ApiProperty()
  @Column({ type: 'date' })
  bookingDate: Date;
}
