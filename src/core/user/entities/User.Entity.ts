import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, Unique } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { UserRole } from './UserRole.Enum';
@Entity({ name: 'users' })
@Unique(['email'])
export class User extends CoreEntity {
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
  contactNumber: number;

  @ApiProperty()
  @Column({ type: 'varchar', default: UserRole.USER })
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
