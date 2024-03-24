import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { Booking } from '../../booking/entities/Booking.Entity';
import { User } from '../../user/entities/User.Entity';
import { PaymentMode } from './PaymentMode.Enum';
import { PaymentStatus } from './PaymentStatus.Enum';

@Entity('payments')
export class Payment extends CoreEntity {
  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ApiProperty()
  @Column({ type: 'number', nullable: false })
  userId: number;

  @OneToOne(() => Booking, (booking) => booking.payment)
  @JoinColumn()
  booking: Booking;

  @ApiProperty()
  @Column({ type: 'number', nullable: false })
  bookingId: number;

  @ApiProperty()
  @Column({ type: 'varchar', default: PaymentMode.CashOnDelivery })
  paymentMode: PaymentMode;

  @ApiProperty()
  @Column({ type: 'varchar', default: PaymentStatus.Pending })
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  pidx: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  priceInCents: string;
}
