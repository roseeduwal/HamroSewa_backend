import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { Product } from '../../product/entities/Product.Entity';
import { User } from '../../user/entities/User.Entity';

@Entity('reviews')
export class Review extends CoreEntity {
  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @ApiProperty()
  @Column({ type: 'number', nullable: false })
  productId: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ApiProperty()
  @Column({ type: 'number', nullable: false })
  userId: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  review: string;

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  rating: number;
}
