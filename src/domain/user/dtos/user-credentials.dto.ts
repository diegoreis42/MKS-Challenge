import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/domain/user/dtos/user.dto';

export class UserCredentialsDto extends PickType(UserDto, [
  'email',
  'password',
]) {}
