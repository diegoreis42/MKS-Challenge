import { OmitType, PartialType } from '@nestjs/swagger';
import { MovieDto } from './movie.dto';

export class MovieUpdateDto extends PartialType(OmitType(MovieDto, ['id'])) {}
