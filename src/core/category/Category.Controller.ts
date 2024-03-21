import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../../lib/decorators/Roles.Decorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.Guard';
import { RolesGuard } from '../auth/guards/Roles.Guard';
import { UserRole } from '../user/entities/UserRole.Enum';
import { CategoryService } from './Category.Service';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@ApiTags('categories')
@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  fetchAll() {
    return this.categoryService.fetchAll();
  }

  @ApiBearerAuth()
  @hasRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get(':id')
  fetchDetail(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.fetchDetail(id);
  }

  @ApiBearerAuth()
  @hasRoles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
