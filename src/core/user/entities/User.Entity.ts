import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { Booking } from '../../booking/entities/Booking.Entity';
import { CartItem } from '../../cart-item/entities/CartItem.Entity';
import { UserProfessional } from './UserProfession.Entity';
import { UserRole } from './UserRole.Enum';
@Entity({ name: 'users' })
@Unique(['email'])
export class User extends CoreEntity {
  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];

  @OneToMany(() => UserProfessional, (professional) => professional.user)
  professions: UserProfessional[];

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  contactNumber: string;

  @ApiProperty()
  @Column({ type: 'varchar', default: UserRole.User })
  role: UserRole;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  address: string;
}
