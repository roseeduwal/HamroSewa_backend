import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  productId: number;
}
