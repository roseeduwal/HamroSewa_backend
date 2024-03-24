import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../lib/decorators/CurrentUser.Decorator';
import { hasRoles } from '../../lib/decorators/Roles.Decorator';
import { UserTypeParamDto } from '../../lib/utils/UserTypeParamDto';
import { JwtAuthGuard } from '../auth/guards/JwtAuth.Guard';
import { RolesGuard } from '../auth/guards/Roles.Guard';
import { UserService } from './User.Service';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { User } from './entities/User.Entity';
import { UserRole } from './entities/UserRole.Enum';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: User })
  @Get('me')
  getMe(@CurrentUser() userId: number) {
    return this.userService.findOne(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.Admin)
  @Get()
  fetch(@Query() userType: UserTypeParamDto) {
    return this.userService.fetch(userType);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profileImageUrl'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.Admin)
  @Patch('upload/:id')
  upload(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() profileImageUrl: Express.Multer.File,
  ) {
    return this.userService.upload(id, profileImageUrl);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.Admin)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.Admin)
  @Get('professionals')
  fetchProfessionals() {
    return this.userService.fetchProfessionals();
  }
}
