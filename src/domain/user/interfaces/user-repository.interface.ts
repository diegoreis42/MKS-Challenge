import { User } from '../entities';
import { IUser } from '../interfaces/user.interface';

export abstract class IUserRepository {
  abstract createOne(user: IUser): Promise<User>;
  abstract findOneByEmail(email: string): Promise<User | null>;
}
