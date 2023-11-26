import { PickType } from '@nestjs/swagger';
import { Movie } from '../entities';

export class MovieId extends PickType(Movie, ['id']) {}
