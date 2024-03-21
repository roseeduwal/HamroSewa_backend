import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CoreEntity } from '../../../lib/utils/Base.Entity';
import { Product } from '../../product/entities/Product.Entity';
import { UserProfessional } from '../../user/entities/UserProfession.Entity';

@Entity('categories')
export class Category extends CoreEntity {
  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
  })
  products: Product[];

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  categoryName: string;

  @ManyToOne(() => UserProfessional, (professional) => professional.category)
  professional: UserProfessional;

  @BeforeInsert()
  capitalizeName(): void {
    this.categoryName =
      this.categoryName[0].toUpperCase() +
      this.categoryName.toLowerCase().slice(1);
  }
}
