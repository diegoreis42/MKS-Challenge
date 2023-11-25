import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/domain/auth';
import { MovieController } from 'src/domain/movie/controllers';
import { Movie } from 'src/domain/movie/entities';
import {
  IMovieRepository,
  IMovieServices,
  IMovieUseCases,
} from 'src/domain/movie/interfaces';
import { MovieRepository } from 'src/domain/movie/repository';
import { MovieServices } from 'src/domain/movie/services';
import { MovieUseCases } from 'src/domain/movie/usecases';

@Module({
  controllers: [MovieController],
  imports: [TypeOrmModule.forFeature([Movie]), AuthModule],
  exports: [IMovieRepository, TypeOrmModule],
  providers: [
    {
      provide: IMovieRepository,
      useClass: MovieRepository,
    },
    {
      provide: IMovieUseCases,
      useClass: MovieUseCases,
    },
    {
      provide: IMovieServices,
      useClass: MovieServices,
    },
  ],
})
export class MovieModule {}
