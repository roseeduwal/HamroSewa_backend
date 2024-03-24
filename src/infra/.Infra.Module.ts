import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/Firebase.Module';
import { KhaltiModule } from './khalti/Khalti.Module';
import { MailModule } from './mail/Mail.Module';

@Module({
  imports: [FirebaseModule, MailModule, KhaltiModule],
})
export class InfraModule {}
