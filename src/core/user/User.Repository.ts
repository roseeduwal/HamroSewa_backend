import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.Entity';
import { UserProfessional } from './entities/UserProfession.Entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    @InjectRepository(UserProfessional)
    private readonly professionRepository: Repository<UserProfessional>,
  ) {}
  async create(user: Partial<User>) {
    try {
      const createdUser = await this.repository.save(
        this.repository.create(user),
      );
      if (!createdUser) {
        return null;
      }
      return this.findOne(createdUser.id);
    } catch (err) {
      return null;
    }
  }

  async findOne(id: number) {
    return this.repository
      .createQueryBuilder('u')
      .where('u.id = :id', { id })
      .getOne();
  }

  async findOneBy(by: { email: string }) {
    return this.repository
      .createQueryBuilder('u')
      .where('u.email = :email', { email: by.email })
      .getOne();
  }

  async update(user: Partial<User>) {
    try {
      const preloaded = await this.repository.preload({ ...user });

      const updatedUser = await this.repository.save({ ...preloaded });
      if (!updatedUser) {
        return null;
      }

      return this.findOne(updatedUser.id);
    } catch (err) {
      return null;
    }
  }

  async createProfession(userId: number, professionId: number) {
    try {
      const createdUser = await this.professionRepository.save(
        this.professionRepository.create({ categoryId: professionId, userId }),
      );
      if (!createdUser) {
        return null;
      }
      return this.findOne(createdUser.id);
    } catch (err) {
      return null;
    }
  }
}
