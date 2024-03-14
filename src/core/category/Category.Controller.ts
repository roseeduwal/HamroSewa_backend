import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../../lib/decorators/Roles.Decorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.Guard';
import { RolesGuard } from '../auth/guards/Roles.Guard';
import { UserRole } from '../user/entities/UserRole.Enum';
import { CategoryService } from './Category.Service';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  fetchAll() {
    return this.categoryService.fetchAll();
  }

  @ApiBearerAuth()
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
}
