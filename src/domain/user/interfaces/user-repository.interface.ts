import { User } from 'src/domain/user/entities';
import { IUser } from 'src/domain/user/interfaces/user.interface';

export abstract class IUserRepository {
  abstract createOne(user: IUser): Promise<User>;
  abstract findOneByEmail(email: string): Promise<User | null>;
}
