import { PickType } from '@nestjs/swagger';
import { Movie } from 'src/domain/movie/entities';

export class MovieId extends PickType(Movie, ['id']) {}
