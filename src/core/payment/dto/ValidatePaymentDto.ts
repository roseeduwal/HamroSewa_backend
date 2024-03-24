import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ValidatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  pidx: string;
}
