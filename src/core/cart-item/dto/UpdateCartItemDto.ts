import { PartialType } from '@nestjs/swagger';
import { CreateCartItemDto } from './CreateCartItemDto';

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {}
