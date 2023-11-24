import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserEnum } from 'src/domains/user/enums';

export class UserDto {
  @IsEmail()
  @MaxLength(UserEnum.MAX_EMAIL_LENGTH)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(UserEnum.MAX_NAME_LENGTH)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(7)
  @IsNotEmpty()
  password: string;
}
