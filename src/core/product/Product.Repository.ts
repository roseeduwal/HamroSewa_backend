import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/Product.Entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
  ) {}

  async create(product: Partial<Product>) {
    try {
      const createdProduct = await this.repository.save(
        this.repository.create(product),
      );

      if (!createdProduct) {
        return null;
      }

      return createdProduct;
    } catch (err) {
      console.log('repo', err);
      return null;
    }
  }

  async findAll() {
    return this.repository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .getMany();
  }
}
