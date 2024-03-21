import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../../lib/decorators/Roles.Decorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.Guard';
import { RolesGuard } from '../auth/guards/Roles.Guard';
import { UserRole } from '../user/entities/UserRole.Enum';
import { ProductService } from './Product.Service';
import { CreateProductDto } from './dto/CreateProductDto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  fetchAll() {
    return this.productService.fetchAll();
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('productImage'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.Admin)
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() productImage: Express.Multer.File,
  ) {
    return this.productService.create(productImage, createProductDto);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('productImage'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.Admin)
  @Patch()
  update(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() productImage: Express.Multer.File,
  ) {
    return this.productService.create(productImage, createProductDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.Admin)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
