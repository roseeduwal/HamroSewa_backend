import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeParamDto } from '../../lib/utils/UserTypeParamDto';
import { UserRole } from '../user/entities/UserRole.Enum';
import { Review } from './entities/Review.Entity';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review) private readonly repository: Repository<Review>,
  ) {}

  async create(review: Partial<Review>) {
    try {
      const newReview = await this.repository.save(
        this.repository.create(review),
      );

      if (!newReview) return null;

      return newReview;
    } catch (err) {
      return null;
    }
  }
  async find(userType: UserTypeParamDto, userId: number) {
    const query = this.repository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.product', 'product');
    if (userType.userType === UserRole.User) {
      query.where('r.userId = :userId', { userId });
    } else {
      query.leftJoinAndSelect('r.user', 'user');
    }

    return query.getMany();
  }
}
