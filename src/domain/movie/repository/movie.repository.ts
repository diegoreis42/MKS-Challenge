import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/domain/movie/entities';
import { IMovie, IMovieRepository } from 'src/domain/movie/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private userRepository: Repository<Movie>,
  ) {}

  createOne(movie: IMovie): Promise<Movie> {
    return this.userRepository.save(this.userRepository.create(movie));
  }
  
}
