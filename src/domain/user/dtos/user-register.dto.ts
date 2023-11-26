import { PickType } from '@nestjs/swagger';
import { UserDto } from '../dtos/user.dto';

export class UserRegisterDto extends PickType(UserDto, [
  'email',
  'name',
  'password',
]) {}
