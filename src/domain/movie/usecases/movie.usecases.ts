import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MovieCreateDto, MovieUpdateDto } from 'src/domain/movie/dtos';
import { MovieErrorsEnum } from 'src/domain/movie/enums';
import {
  IMovie,
  IMovieRepository,
  IMovieServices,
  IMovieUseCases,
} from 'src/domain/movie/interfaces';
import { DeleteResult } from 'typeorm';

@Injectable()
export class MovieUseCases implements IMovieUseCases {
  constructor(
    private movieRepository: IMovieRepository,
    private movieServices: IMovieServices,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async createMovie(movie: MovieCreateDto): Promise<IMovie> {
    if (await this.movieRepository.findOneByName(movie.name)) {
      throw new HttpException(
        MovieErrorsEnum.MOVIE_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }
    return this.movieRepository.createOne(movie);
  }

  async updateMovie(
    movieDto: MovieUpdateDto,
    movieId: string,
  ): Promise<IMovie> {
    await this.movieServices.findMovie(movieId);

    await this.cacheService.set(movieId, movieDto);

    return this.movieRepository.updateOne(movieDto, movieId);
  }

  async deleteMovie(movieId: string): Promise<DeleteResult> {
    const movie = await this.movieServices.findMovie(movieId);

    return this.movieRepository.deleteOne(movie);
  }
}
