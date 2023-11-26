import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './controllers';
import { IAuthService, IAuthUseCases } from './interfaces';
import { AuthService } from './services';
import { AuthUseCases } from './usecases';
import { UserModule } from '../user';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expirationTime },
    }),
  ],
  providers: [
    {
      provide: IAuthUseCases,
      useClass: AuthUseCases,
    },
    {
      provide: IAuthService,
      useClass: AuthService,
    },
  ],
  exports: [IAuthService],
})
export class AuthModule {}
