import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { Product } from '../../product/entities/Product.Entity';
import { User } from '../../user/entities/User.Entity';

@Entity('cart-items')
export class CartItem extends CoreEntity {
  @ApiProperty()
  @Column({ type: 'int', nullable: false })
  quantity: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.cartItems)
  user: User;

  @ApiProperty()
  @Column({ type: 'number', nullable: false })
  userId: number;

  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @ApiProperty()
  @Column({ type: 'number', nullable: false })
  productId: number;

  //virtual property
  @ApiProperty()
  totalPrice: number;
}
