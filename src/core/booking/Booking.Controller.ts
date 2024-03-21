import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../lib/decorators/CurrentUser.Decorator';
import { hasRoles } from '../../lib/decorators/Roles.Decorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.Guard';
import { RolesGuard } from '../auth/guards/Roles.Guard';
import { UserRole } from '../user/entities/UserRole.Enum';
import { BookingService } from './Booking.Service';
import { CreateBookingDto } from './dto/CreateBookingDto';
import { UserTypeParamDto } from './entities/UserTypePramDto';

@ApiTags('bookings')
@Controller('bookings')
@UseInterceptors(ClassSerializerInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.User)
  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
    @CurrentUser() userId: number,
  ) {
    return this.bookingService.create(createBookingDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.User, UserRole.Admin)
  @Get()
  fetch(@Param() userType: UserTypeParamDto, @CurrentUser() userId: number) {
    return this.bookingService.fetch(userType, userId);
  }
}
