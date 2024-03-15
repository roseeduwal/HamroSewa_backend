import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './User.Repository';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const userExists = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });

      if (userExists) {
        throw new BadRequestException('User already exists!');
      }
      const user = await this.userRepository.create(createUserDto);
      return user;
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  async findOneBy(by: { email: string }) {
    return this.userRepository.findOneBy(by);
  }

  async update(id: number, updateUserPort: UpdateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne(id);
      if (!existingUser) {
        throw new NotFoundException();
      }
      const user = await this.userRepository.update({
        ...existingUser,
        ...updateUserPort,
      });
      const updatedUser = await this.userRepository.findOne(user.id);
      return updatedUser;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async createProfession(userId: number, professionId: number) {
    return this.userRepository.createProfession(userId, professionId);
  }
}
