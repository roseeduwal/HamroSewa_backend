import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { BookingItems } from '../../booking-item/entities/BookingItem.Entity';
import { Payment } from '../../payment/entities/Payment.Entity';
import { User } from '../../user/entities/User.Entity';
import { UserProfessional } from '../../user/entities/UserProfession.Entity';

@Entity('bookings')
export class Booking extends CoreEntity {
  @OneToOne(() => Payment, (payment) => payment.booking)
  payment: Payment;

  @ManyToOne(
    () => UserProfessional,
    (professional) => professional.assignedBookings,
  )
  professional: UserProfessional;
  @Column({ type: 'number', nullable: true })
  professionalId: number;

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
