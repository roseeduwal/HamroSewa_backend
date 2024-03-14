import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/Firebase.Module';
import { MailModule } from './mail/Mail.Module';

@Module({
  imports: [FirebaseModule, MailModule],
})
export class InfraModule {}
