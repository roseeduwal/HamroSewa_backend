import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/Payment.Entity';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment) private readonly repository: Repository<Payment>,
  ) {}

  async create(payment: Partial<Payment>) {
    try {
      const newPayment = await this.repository.save(
        this.repository.create(payment),
      );

      if (!newPayment) return null;
      return this.findOne(newPayment.id);
    } catch (err) {
      return null;
    }
  }

  async find() {
    return this.repository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.user', 'user')
      .leftJoinAndSelect('p.booking', 'booking')
      .getMany();
  }
  async findOne(id: number) {
    return this.repository
      .createQueryBuilder('p')
      .where('p.id = :id', { id })
      .leftJoinAndSelect('p.booking', 'booking')
      .leftJoinAndSelect('p.user', 'user')
      .getOne();
  }

  async update(payment: Partial<Payment>) {
    try {
      const preloaded = await this.repository.preload({ ...payment });

      const updatePayment = await this.repository.save({ ...preloaded });

      return this.findOne(updatePayment.id);
    } catch (err) {
      return null;
    }
  }

  async findByUserId(userId: number) {
    return this.repository
      .createQueryBuilder('p')
      .where('p.userId = :userId', { userId })

      .getMany();
  }

  async deleteMultiple(payments: Payment[]) {
    await this.repository.softRemove(payments);
  }

  async findBy(by: { pidx: string }) {
    return this.repository
      .createQueryBuilder('p')
      .where('p.pidx = :pidx', { pidx: by.pidx })
      .leftJoinAndSelect('p.booking', 'booking')
      .leftJoinAndSelect('p.user', 'user')
      .getOne();
  }
}
