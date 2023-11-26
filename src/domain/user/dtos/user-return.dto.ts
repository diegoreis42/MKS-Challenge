import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from '../dtos/user.dto';

export class UserReturnDto extends OmitType(UserDto, ['password']) {}
