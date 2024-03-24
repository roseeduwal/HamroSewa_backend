import { Module } from '@nestjs/common';
import { ReviewController } from './Review.Controller';
import { ReviewRepository } from './Review.Repository';
import { ReviewService } from './Review.Service';
import { ReviewDIToken } from './ReviewDIToken';

@Module({
  imports: [ReviewDIToken.reviewEntity],
  providers: [ReviewService, ReviewRepository],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
