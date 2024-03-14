import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/Category.Entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(category: Partial<Category>) {
    try {
      const createdCategory = await this.repository.save(
        this.repository.create(category),
      );

      if (!this.create) return null;

      return this.findOne(createdCategory.id);
    } catch (err) {
      return null;
    }
  }

  async findOne(id: number) {
    return this.repository
      .createQueryBuilder('c')
      .where('c.id = :id', { id })
      .getOne();
  }

  async findOneBy(by: { categoryName: string }) {
    return this.repository
      .createQueryBuilder('c')
      .where('c.categoryName = :categoryName', {
        categoryName: by.categoryName,
      })
      .getOne();
  }

  async findAll() {
    return this.repository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.products', 'products')
      .getMany();
  }
}