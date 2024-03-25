import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/Contact.Entity';

export class ContactDIToken {
  static readonly contactEntity = TypeOrmModule.forFeature([Contact]);
}
