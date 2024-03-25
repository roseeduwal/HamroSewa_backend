import { Module } from '@nestjs/common';
import { ContactController } from './Contact.Controller';
import { ContactRepository } from './Contact.Repository';
import { ContactService } from './Contact.Service';
import { ContactDIToken } from './ContactDIToken';

@Module({
  imports: [ContactDIToken.contactEntity],
  controllers: [ContactController],
  providers: [ContactService, ContactRepository],
  exports: [ContactService],
})
export class ContactModule {}
