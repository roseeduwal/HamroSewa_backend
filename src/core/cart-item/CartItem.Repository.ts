import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/CartItem.Entity';

@Injectable()
export class CartItemRepository {
  constructor(
    @InjectRepository(CartItem)
    private readonly repository: Repository<CartItem>,
  ) {}

  async create(cartItem: Partial<CartItem>) {
    try {
      cartItem;
      const newItem = await this.repository.save(
        this.repository.create(cartItem),
      );

      if (!newItem) return null;
      return newItem;
    } catch (err) {
      err;
      return null;
    }
  }

  async findAll(userId: number) {
    return this.repository
      .createQueryBuilder('ci')
      .where('ci.userId = :userId', { userId })
      .leftJoinAndSelect('ci.product', 'product')
      .getMany();
  }

  async findBy(by: { productId: number; userId: number }) {
    return this.repository
      .createQueryBuilder('ci')
      .where('ci.userId = :userId', { userId: by.userId })
      .andWhere('ci.productId = :productId', { productId: by.productId })
      .getOne();
  }

  async findOne(id: number) {
    return this.repository
      .createQueryBuilder('ci')
      .where('ci.id = :id', { id })
      .getOne();
  }

  async update(cartItem: Partial<CartItem>) {
    try {
      const preloaded = await this.repository.preload({ ...cartItem });

      const updateCartItem = await this.repository.save({ ...preloaded });
      if (!updateCartItem) {
        return null;
      }

      return this.findOne(updateCartItem.id);
    } catch (err) {
      return null;
    }
  }

  async deleteBy(userId: number) {
    await this.repository.softDelete({ userId });
  }

  async softDelete(id: number) {
    await this.repository.softDelete(id);
  }
}
