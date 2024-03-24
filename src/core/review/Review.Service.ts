import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserTypeParamDto } from '../../lib/utils/UserTypeParamDto';
import { ReviewRepository } from './Review.Repository';
import { CreateReviewDto } from './dto/CreateReviewDto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async create(userId: number, createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewRepository.create({
        userId,
        ...createReviewDto,
      });
      if (!review) throw new NotFoundException();
      return review;
    } catch (err) {
      console.log(err);
    }
  }

  async fetch(userType: UserTypeParamDto, userId: number) {
    try {
      const reviews = await this.reviewRepository.find(userType, userId);
      if (!reviews) throw new NotFoundException();
      return reviews;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
