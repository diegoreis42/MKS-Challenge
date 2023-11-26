import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserEnum } from '../enums';

export class UserDto {
  @ApiProperty({
    example: 'user@gmail.com',
    required: true,
  })
  @IsEmail()
  @MaxLength(UserEnum.MAX_EMAIL_LENGTH)
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    example: 'Jonh Doe',
    required: true,
  })
  @IsString()
  @MaxLength(UserEnum.MAX_NAME_LENGTH)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'secure123',
    required: true,
    minLength: 7,
  })
  @IsString()
  @MinLength(7)
  @IsNotEmpty()
  password: string;
}
