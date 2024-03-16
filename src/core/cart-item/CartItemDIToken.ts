import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/CartItem.Entity';

export class CartItemDIToken {
  static readonly CartItemEntity = TypeOrmModule.forFeature([CartItem]);
}
