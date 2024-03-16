import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { Booking } from '../../booking/entities/Booking.Entity';
import { Product } from '../../product/entities/Product.Entity';

@Entity('bookingItems')
export class BookingItems extends CoreEntity {
  @ApiProperty()
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Booking, (order) => order.bookingItems)
  booking: Booking;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ type: 'number' })
  productId: number;
}
