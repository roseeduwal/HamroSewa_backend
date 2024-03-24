import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../lib/decorators/CurrentUser.Decorator';
import { hasRoles } from '../../lib/decorators/Roles.Decorator';
import { UserTypeParamDto } from '../../lib/utils/UserTypeParamDto';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.Guard';
import { RolesGuard } from '../auth/guards/Roles.Guard';
import { UserRole } from '../user/entities/UserRole.Enum';
import { ReviewService } from './Review.Service';
import { CreateReviewDto } from './dto/CreateReviewDto';

@Controller('reviews')
@ApiTags('reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.User)
  @Post()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() userId: number,
  ) {
    return this.reviewService.create(userId, createReviewDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.User, UserRole.Admin)
  @Get()
  fetch(@Query() userType: UserTypeParamDto, @CurrentUser() userId: number) {
    return this.reviewService.fetch(userType, userId);
  }
}
