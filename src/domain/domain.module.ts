import { Module } from '@nestjs/common';
import { AuthModule } from 'src/domain/auth';
import { MovieModule } from 'src/domain/movie';
import { UserModule } from 'src/domain/user';

@Module({
  imports: [UserModule, AuthModule, MovieModule],
})
export class DomainModule {}
