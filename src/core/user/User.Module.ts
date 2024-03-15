import { Module } from '@nestjs/common';
import { UserController } from './User.Controller';
import { UserRepository } from './User.Repository';
import { UserService } from './User.Service';
import { UserDIToken } from './UserDIToken';

@Module({
  imports: [UserDIToken.UserEntity, UserDIToken.ProfessionEntity],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
