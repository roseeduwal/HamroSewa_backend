import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { hasRoles } from '../../lib/decorators/Roles.Decorator';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.Guard';
import { RolesGuard } from '../auth/guards/Roles.Guard';
import { UserRole } from '../user/entities/UserRole.Enum';
import { PaymentService } from './Payment.Service';
import { ValidatePaymentDto } from './dto/ValidatePaymentDto';

@ApiTags('payments')
@Controller('payments')
@UseInterceptors(ClassSerializerInterceptor)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.User)
  @Post('validate')
  verify(@Body() validate: ValidatePaymentDto) {
    return this.paymentService.validate(validate);
  }
}
