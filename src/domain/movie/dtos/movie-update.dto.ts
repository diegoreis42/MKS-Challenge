import { OmitType, PartialType } from '@nestjs/swagger';
import { MovieDto } from 'src/domain/movie/dtos/movie.dto';

export class MovieUpdateDto extends PartialType(OmitType(MovieDto, ['id'])) {}
