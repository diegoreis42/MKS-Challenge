import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/domain/movie/entities';
import { IMovieRepository } from 'src/domain/movie/interfaces';
import { MovieRepository } from 'src/domain/movie/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  exports: [IMovieRepository, TypeOrmModule],
  providers: [
    {
      provide: IMovieRepository,
      useClass: MovieRepository,
    },
  ],
})
export class MovieModule {}
