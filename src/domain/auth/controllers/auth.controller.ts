import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthUseCases } from 'src/domain/auth/interfaces';
import { UserCredentialsDto, UserRegisterDto } from 'src/domain/user/dtos';

@UsePipes(new ValidationPipe({ whitelist: true }))
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCases: IAuthUseCases) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The register has been successfully created.',
  })
  register(@Body() userDto: UserRegisterDto) {
    return this.authUseCases.register(userDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The login was successfull.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden, verify the password.',
  })
  login(@Body() body: UserCredentialsDto) {
    return this.authUseCases.login(body);
  }
}
