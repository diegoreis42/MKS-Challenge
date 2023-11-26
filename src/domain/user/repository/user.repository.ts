import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { IUser, IUserRepository } from '../interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createOne(user: IUser): Promise<User> {
    return this.userRepository.save(this.userRepository.create(user));
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
