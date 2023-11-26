import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { MovieModule } from './movie';
import { UserModule } from './user';

@Module({
  imports: [UserModule, AuthModule, MovieModule],
})
export class DomainModule {}
