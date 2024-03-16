import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Auth.Module';
import { BookingModule } from './booking/Booking.Module';
import { CartItemModule } from './cart-item/CartItem.Module';
import { CategoryModule } from './category/Category.Module';
import { ProductModule } from './product/Product.Module';
import { UserModule } from './user/User.Module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    CartItemModule,
    BookingModule,
  ],
})
export class CoreModule {}
