import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/user/entities';
import { IUserRepository, IUserServices } from 'src/domain/user/interfaces';
import { UserRepository } from 'src/domain/user/repository';
import { UserServices } from 'src/domain/user/services';

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
