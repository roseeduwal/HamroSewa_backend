import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from '../../auth/dto/SignUpDto';

export class UpdateUserDto extends PartialType(SignUpDto) {}
