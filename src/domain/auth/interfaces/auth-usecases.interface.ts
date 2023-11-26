import { UserCredentialsDto, UserRegisterDto } from '../../user/dtos';

export abstract class IAuthUseCases {
  abstract register(user: UserRegisterDto);
  abstract login(user: UserCredentialsDto);
}
