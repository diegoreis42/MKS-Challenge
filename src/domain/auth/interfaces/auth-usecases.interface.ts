import { UserRegisterDto } from 'src/domains/user/dtos';

export abstract class IAuthUseCases {
  abstract register(user: UserRegisterDto);
}
