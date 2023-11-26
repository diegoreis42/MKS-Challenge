import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth';
import { MovieController } from './controllers';
import { Movie } from './entities';
import { IMovieRepository, IMovieServices, IMovieUseCases } from './interfaces';
import { MovieRepository } from './repository';
import { MovieServices } from './services';
import { MovieUseCases } from './usecases';

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
