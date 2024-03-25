import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Auth.Module';
import { BookingModule } from './booking/Booking.Module';
import { CartItemModule } from './cart-item/CartItem.Module';
import { CategoryModule } from './category/Category.Module';
import { ContactModule } from './contact/Contact.Module';
import { EventListenerModule } from './event-listerner/EventListener.Module';
import { PaymentModule } from './payment/Payment.Module';
import { ProductModule } from './product/Product.Module';
import { ReviewModule } from './review/Review.Module';
import { UserModule } from './user/User.Module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    CartItemModule,
    BookingModule,
    ReviewModule,
    PaymentModule,
    EventListenerModule,
    ContactModule,
  ],
})
export class CoreModule {}
