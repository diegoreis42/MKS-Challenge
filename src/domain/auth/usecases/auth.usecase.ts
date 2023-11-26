import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository, IUserServices } from '../../user/interfaces';
import * as bcrypt from 'bcrypt';
import { AuthEnum, AuthErrorsEnum } from '../enums';
import { UserCredentialsDto, UserRegisterDto } from '../../user/dtos';
import { IAuthService, IAuthUseCases } from '../interfaces';

@Injectable()
export class AuthUseCases implements IAuthUseCases {
  constructor(
    private userServices: IUserServices,
    private userRepository: IUserRepository,
    private authService: IAuthService,
  ) {}

  async register(user: UserRegisterDto) {
    await this.userServices.verifyEmailExists(user.email);

    const { password, ...newUser } = await this.userRepository.createOne({
      ...user,
      password: await bcrypt.hash(user.password, AuthEnum.HASH_SALT_ROUND),
    });

    return this.authService.createAccessToken(newUser);
  }

  async login(user: UserCredentialsDto) {
    const { password, ...authUser } = await this.userServices.findByEmail(
      user.email,
    );

    if (await bcrypt.compare(user.password, password))
      return this.authService.createAccessToken(authUser);

    throw new HttpException(
      AuthErrorsEnum.WRONG_PASSWORD,
      HttpStatus.BAD_REQUEST,
    );
  }
}
