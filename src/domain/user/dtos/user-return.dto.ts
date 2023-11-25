import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from 'src/domain/user/dtos/user.dto';

export class UserReturnDto extends OmitType(UserDto, ['password']) {}
