import { Injectable } from '@nestjs/common';
import { IUserRepository, IUserServices } from 'src/domain/user/interfaces';
import * as bcrypt from 'bcrypt';
import { AuthEnum } from 'src/domain/auth/enums';
import { UserCredentialsDto, UserRegisterDto } from 'src/domain/user/dtos';
import { IAuthService, IAuthUseCases } from 'src/domain/auth/interfaces';

@Injectable()
export class AuthUseCases implements IAuthUseCases {
  constructor(
    private userServices: IUserServices,
    private userRepository: IUserRepository,
    private authService: IAuthService,
  ) {}

  async register(user: UserRegisterDto) {
    await this.userServices.verifyEmailExists(user.);

    const { password, ...newUser } = await this.userRepository.createOne({
      ...user,
      password: await bcrypt.hash(user.password, AuthEnum.HASH_SALT_ROUND),
    });

    return this.authService.createAccessToken(newUser);
  }
}
