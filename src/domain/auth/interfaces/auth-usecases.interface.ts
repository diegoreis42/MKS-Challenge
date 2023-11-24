import { UserCredentialsDto, UserRegisterDto } from 'src/domain/user/dtos';

export abstract class IAuthUseCases {
  abstract register(user: UserRegisterDto);
  abstract login(user: UserCredentialsDto);
}
