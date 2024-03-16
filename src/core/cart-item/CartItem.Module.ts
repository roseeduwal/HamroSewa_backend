import { Module } from '@nestjs/common';
import { CartItemController } from './CartItem.Controller';
import { CartItemRepository } from './CartItem.Repository';
import { CartItemService } from './CartItem.Service';
import { CartItemDIToken } from './CartItemDIToken';

@Module({
  imports: [CartItemDIToken.CartItemEntity],
  providers: [CartItemService, CartItemRepository],
  controllers: [CartItemController],
  exports: [CartItemService],
})
export class CartItemModule {}
