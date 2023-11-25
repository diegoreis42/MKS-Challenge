import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovieCreateDto } from 'src/domain/movie/dtos';
import { MovieErrorsEnum } from 'src/domain/movie/enums';
import {
  IMovie,
  IMovieRepository,
  IMovieUseCases,
} from 'src/domain/movie/interfaces';

@Injectable()
export class MovieUseCases implements IMovieUseCases {
  constructor(private movieRepository: IMovieRepository) {}

  async createMovie(movie: MovieCreateDto): Promise<IMovie> {
    if (await this.movieRepository.findOneByName(movie.name)) {
      throw new HttpException(
        MovieErrorsEnum.MOVIE_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }
    return this.movieRepository.createOne(movie);
  }
}
