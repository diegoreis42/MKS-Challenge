import { MovieCreateDto, MovieUpdateDto } from '../dtos';
import { IMovie } from './movie.interface';
import { DeleteResult } from 'typeorm';

export abstract class IMovieUseCases {
  abstract createMovie(movie: MovieCreateDto): Promise<IMovie>;
  abstract updateMovie(
    movieDto: MovieUpdateDto,
    movieId: string,
  ): Promise<IMovie>;
  abstract deleteMovie(movieId: string): Promise<DeleteResult>;
}
