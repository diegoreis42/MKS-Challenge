import { Module } from '@nestjs/common';
import { AuthModule } from 'src/domain/auth/auth.module';
import { MovieModule } from 'src/domain/movie/movie.module';
import { UserModule } from 'src/domain/user';

@Module({
  imports: [UserModule, AuthModule, MovieModule],
})
export class DomainModule {}
