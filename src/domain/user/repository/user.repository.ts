import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities';
import { IUser, IUserRepository } from 'src/domain/user/interfaces';
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
