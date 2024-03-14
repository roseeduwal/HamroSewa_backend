import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './CreateProductDto';

export class UpdateProduct extends PartialType(CreateProductDto) {}
