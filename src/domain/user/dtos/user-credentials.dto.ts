import { PickType } from '@nestjs/swagger';
import { UserDto } from '../dtos/user.dto';

export class UserCredentialsDto extends PickType(UserDto, [
  'email',
  'password',
]) {}
