import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
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
import { CartItemService } from './CartItem.Service';
import { CreateCartItemDto } from './dto/CreateCartItemDto';

@ApiTags('cart-items')
@Controller('cart-items')
@UseInterceptors(ClassSerializerInterceptor)
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.User)
  @Get()
  fetch(@CurrentUser() userId: number) {
    return this.cartItemService.fetch(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.User)
  @Post()
  create(
    @Body() createCartItemDto: CreateCartItemDto,
    @CurrentUser() userId: number,
  ) {
    return this.cartItemService.create(createCartItemDto, userId);
  }
}
