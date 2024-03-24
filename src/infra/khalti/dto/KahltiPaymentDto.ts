import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class KhaltiPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  return_url: string;

  @ApiProperty()
  @IsNotEmpty()
  website_url: string;

  @ApiProperty()
  @IsNotEmpty()
  purchase_order_id: string;

  @ApiProperty()
  @IsNotEmpty()
  purchase_order_name: string;

  @ApiProperty()
  @IsNotEmpty()
  amount: string;
}
