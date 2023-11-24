export abstract class IUserServices {
  abstract verifyEmailExists(email: string): Promise<Boolean>;
}
