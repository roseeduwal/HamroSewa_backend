import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { Category } from '../../category/entities/Category.Entity';

@Entity('products')
export class Product extends CoreEntity {
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty()
  @Column({ type: 'number', nullable: false })
  categoryId: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  productName: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  productDescription: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  productImageUrl: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  productPrice: string;
}
