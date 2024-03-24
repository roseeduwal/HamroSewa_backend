import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseService } from '../../infra/firebase/FIrebase.Service';
import { UserTypeParamDto } from '../../lib/utils/UserTypeParamDto';
import { UserRepository } from './User.Repository';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}

  async fetch(userType: UserTypeParamDto) {
    try {
      const users = await this.userRepository.find(userType);
      if (!users) throw new NotFoundException();
      return users;
    } catch (err) {
      console.log(err);
      throw new HttpException('Something went wrong', 500);
    }
  }

  async fetchProfessionals() {
    try {
      const users = await this.userRepository.fetchProfessionals();
      if (!users) throw new NotFoundException();

      return users;
    } catch (err) {
      console.log(err);
      throw new HttpException('Something went wrong', 500);
    }
  }

  async upload(id: number, profileImageUrl: Express.Multer.File) {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) throw new NotFoundException();

      const profileImage = await this.firebaseService.uploadFile(
        profileImageUrl,
        'profile-images',
      );

      return this.userRepository.update({
        ...user,
        profileImageUrl: profileImage,
      });
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException)
        throw new NotFoundException('User not found');
      throw new HttpException('Something went wrong', 500);
    }
  }

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
      err;
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
