import { User } from '../entities';

export abstract class IUserServices {
  abstract verifyEmailExists(email: string): Promise<Boolean>;
  abstract findByEmail(email: string): Promise<User>;
}
