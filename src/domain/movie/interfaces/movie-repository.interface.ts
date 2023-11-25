import { Movie } from 'src/domain/movie/entities';
import { IMovie } from 'src/domain/movie/interfaces/movie.interface';
import { DeleteResult } from 'typeorm';

export abstract class IMovieRepository {
  abstract createOne(movie: IMovie): Promise<Movie>;
  abstract findOne(movieId: string): Promise<Movie>;
  abstract updateOne(movie: Partial<IMovie>): Promise<Movie>;
  abstract deleteOne(movieId: string): Promise<DeleteResult>;
}
