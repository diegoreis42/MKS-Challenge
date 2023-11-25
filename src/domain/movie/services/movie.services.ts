import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovieErrorsEnum } from 'src/domain/movie/enums';
import { IMovieRepository, IMovieServices } from 'src/domain/movie/interfaces';

@Injectable()
export class MovieServices implements IMovieServices {
  constructor(private movieRepository: IMovieRepository) {}

  async findMovie(movieId: string) {
    const movie = await this.movieRepository.findOne(movieId);
    if (!movie) {
      throw new HttpException(
        MovieErrorsEnum.MOVIE_NOT_EXISTS,
        HttpStatus.NOT_FOUND,
      );
    }

    return movie;
  }
}
