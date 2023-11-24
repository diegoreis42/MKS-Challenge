import { User } from 'src/domains/user/entities';
import { IUser } from 'src/domains/user/interfaces/user.interface';

export abstract class IUserRepository {
  abstract createOne(user: IUser): Promise<User>;
  abstract findOneByEmail(email: string): Promise<User | null>;
}
