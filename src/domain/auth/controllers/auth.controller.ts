import {
  Body,
  Controller,
  HttpCode,
  Injectable,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IAuthUseCases } from 'src/domain/auth/interfaces';
import { UserCredentialsDto, UserRegisterDto } from 'src/domain/user/dtos';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCases: IAuthUseCases) {}

  @Post('register')
  registerUser(@Body() userDto: UserRegisterDto) {
    return this.authUseCases.register(userDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() body: UserCredentialsDto) {
    return this.authUseCases.login(body);
  }
}
