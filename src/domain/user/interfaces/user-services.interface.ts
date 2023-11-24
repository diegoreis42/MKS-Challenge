import { User } from 'src/domain/user/entities';

export abstract class IUserServices {
  abstract verifyEmailExists(email: string): Promise<Boolean>;
  abstract findByEmail(email: string): Promise<User>;
}
