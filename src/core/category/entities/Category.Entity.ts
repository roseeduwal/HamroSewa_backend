import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { Product } from '../../product/entities/Product.Entity';

@Entity('categories')
export class Category extends CoreEntity {
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  categoryName: string;

  @BeforeInsert()
  capitalizeName(): void {
    this.categoryName =
      this.categoryName[0].toUpperCase() +
      this.categoryName.toLowerCase().slice(1);
  }
}
