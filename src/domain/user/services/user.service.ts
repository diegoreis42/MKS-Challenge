import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserErrorsEnum } from 'src/domain/user/enums';
import { IUserRepository, IUserServices } from 'src/domain/user/interfaces';

@Injectable()
export class UserServices implements IUserServices {
  constructor(private userRepository: IUserRepository) {}

  async verifyEmailExists(email: string): Promise<Boolean> {
    if (await this.userRepository.findOneByEmail(email)) {
      throw new HttpException(
        UserErrorsEnum.EMAIL_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    return false;
  }
}
