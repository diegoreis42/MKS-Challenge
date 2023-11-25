import { OmitType } from '@nestjs/swagger';
import { MovieDto } from 'src/domain/movie/dtos/movie.dto';

export class MovieCreateDto extends OmitType(MovieDto, ['id']) {}
