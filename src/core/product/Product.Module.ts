import { Module } from '@nestjs/common';
import { FirebaseModule } from '../../infra/firebase/Firebase.Module';
import { CartItemModule } from '../cart-item/CartItem.Module';
import { ProductController } from './Product.Controller';
import { ProductRepository } from './Product.Repository';
import { ProductService } from './Product.Service';
import { ProductDIToken } from './ProductDIToken';

@Module({
  imports: [FirebaseModule, ProductDIToken.productEntity, CartItemModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
