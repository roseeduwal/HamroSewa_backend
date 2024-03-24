import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class KhaltiLookupPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  pidx: string;
}
