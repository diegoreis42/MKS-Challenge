import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/domains/user/dtos/user.dto';

export class UserCredentialsDto extends PickType(UserDto, [
  'email',
  'password',
]) {}