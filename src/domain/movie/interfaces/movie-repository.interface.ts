import { Movie } from '../entities';
import { IMovie } from './movie.interface';
import { DeleteResult } from 'typeorm';

export abstract class IMovieRepository {
  abstract createOne(movie: IMovie): Promise<Movie>;
  abstract findOne(movieId: string): Promise<Movie>;
  abstract updateOne(movie: Partial<IMovie>, movieId: string): Promise<Movie>;
  abstract deleteOne(movieId: string): Promise<DeleteResult>;
  abstract findOneByName(movieName: string): Promise<Movie>;
  abstract findAll(): Promise<Movie[]>;
}
