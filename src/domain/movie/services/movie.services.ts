import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Movie } from '../entities';
import { MovieErrorsEnum } from '../enums';
import { IMovieRepository, IMovieServices } from '../interfaces';

@Injectable()
export class MovieServices implements IMovieServices {
  constructor(
    private movieRepository: IMovieRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async findMovie(movieId: string): Promise<Movie> {
    const cachedData = await this.cacheService.get<Movie>(movieId);

    if (cachedData) {
      return cachedData;
    }
    const movie = await this.movieRepository.findOne(movieId);
    if (!movie) {
      throw new HttpException(
        MovieErrorsEnum.MOVIE_NOT_EXISTS,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.cacheService.set(movieId, movie);

    return movie;
  }
}
