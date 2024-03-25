import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';

@Entity('contacts')
export class Contact extends CoreEntity {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  fullName: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  message: string;
}
