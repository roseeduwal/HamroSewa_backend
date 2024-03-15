import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.Entity';
import { UserProfessional } from './entities/UserProfession.Entity';

export class UserDIToken {
  static readonly UserEntity = TypeOrmModule.forFeature([User]);
  static readonly ProfessionEntity = TypeOrmModule.forFeature([
    UserProfessional,
  ]);
}
