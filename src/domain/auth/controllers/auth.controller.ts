import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/domain/auth/guards';
import { IAuthUseCases } from 'src/domain/auth/interfaces';
import { UserCredentialsDto, UserRegisterDto } from 'src/domain/user/dtos';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCases: IAuthUseCases) {}

  @Post('register')
  register(@Body() userDto: UserRegisterDto) {
    return this.authUseCases.register(userDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() body: UserCredentialsDto) {
    return this.authUseCases.login(body);
  }
}
