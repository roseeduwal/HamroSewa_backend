import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { Booking } from '../../booking/entities/Booking.Entity';
import { Category } from '../../category/entities/Category.Entity';
import { User } from './User.Entity';

@Entity('professionals')
export class UserProfessional extends CoreEntity {
  @OneToMany(() => Booking, (booking) => booking.professional)
  assignedBookings: Booking[];

  @ManyToOne(() => User, (user) => user.professions)
  user: User;

  @Column({ type: 'number', nullable: false })
  @ApiProperty()
  userId: number;

  @OneToMany(() => Category, (category) => category.professional)
  category: Category[];

  @Column()
  @ApiProperty({ type: 'number', nullable: false })
  categoryId: number;
}
