import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../entities';
import { IMovie, IMovieRepository } from '../interfaces';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private repository: Repository<Movie>,
  ) {}

  createOne(movie: IMovie): Promise<Movie> {
    return this.repository.save(this.repository.create(movie));
  }

  findOne(movieId: string): Promise<Movie> {
    return this.repository.findOne({
      where: {
        id: movieId,
      },
    });
  }

  findOneByName(movieName: string): Promise<Movie> {
    return this.repository.findOne({
      where: {
        name: movieName,
      },
    });
  }

  findAll(): Promise<Movie[]> {
    return this.repository.find();
  }

  updateOne(movie: Partial<IMovie>, movieId: string): Promise<Movie> {
    return this.repository.save({ id: movieId, ...movie });
  }

  deleteOne(movieId: string): Promise<DeleteResult> {
    return this.repository.delete(movieId);
  }
}
