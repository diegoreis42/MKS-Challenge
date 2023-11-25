import { PickType } from '@nestjs/mapped-types';
import { Movie } from 'src/domain/movie/entities';

export class MovieId extends PickType(Movie, ['id']) {}