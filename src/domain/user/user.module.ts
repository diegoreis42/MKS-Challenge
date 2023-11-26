import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { IUserRepository, IUserServices } from './interfaces';
import { UserRepository } from './repository';
import { UserServices } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [IUserServices, IUserRepository, TypeOrmModule],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IUserServices,
      useClass: UserServices,
    },
  ],
})
export class UserModule {}
