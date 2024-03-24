import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/Review.Entity';

export class ReviewDIToken {
  static readonly reviewEntity = TypeOrmModule.forFeature([Review]);
}
