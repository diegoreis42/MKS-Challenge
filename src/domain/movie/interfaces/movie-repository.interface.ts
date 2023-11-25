import { Movie } from 'src/domain/movie/entities';
import { IMovie } from 'src/domain/movie/interfaces/movie.interface';

export abstract class IMovieRepository {
  abstract createOne(movie: IMovie): Promise<Movie>;
}
