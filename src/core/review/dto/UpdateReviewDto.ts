import { PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './CreateReviewDto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
