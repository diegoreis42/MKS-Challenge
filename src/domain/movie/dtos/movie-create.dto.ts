import { OmitType } from '@nestjs/swagger';
import { MovieDto } from './movie.dto';

export class MovieCreateDto extends OmitType(MovieDto, ['id']) {}
