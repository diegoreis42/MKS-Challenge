import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from 'src/domain';
import { Movie } from 'src/domain/movie/entities';
import { User } from 'src/domain/user/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'testdb',
      entities: [User, Movie],
      synchronize: true,
    }),
    DomainModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
