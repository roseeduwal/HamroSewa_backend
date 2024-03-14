import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from '../../infra/mail/Mail.Module';
import { UserModule } from '../user/User.Module';
import { AuthController } from './Auth.Controller';
import { AuthService } from './Auth.Service';
import { JwtStrategy } from './strategy/Jwt.Strategy';
import { LocalStrategy } from './strategy/Local.Strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    MailModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
