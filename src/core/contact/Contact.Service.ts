import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContactRepository } from './Contact.Repository';
import { CreateContactDto } from './dto/CreateContactDto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async create(createContactDto: CreateContactDto) {
    try {
      const newContact = await this.contactRepository.create(createContactDto);

      if (!newContact) throw new BadRequestException();

      return newContact;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async fetch() {
    try {
      const contacts = await this.contactRepository.find();

      if (!contacts) throw new NotFoundException();

      return contacts;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
