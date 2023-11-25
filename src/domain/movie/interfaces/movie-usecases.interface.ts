import { MovieCreateDto } from 'src/domain/movie/dtos';
import { IMovie } from 'src/domain/movie/interfaces/movie.interface';

export abstract class IMovieUseCases {
  abstract createMovie(movie: MovieCreateDto): Promise<IMovie>;
}
