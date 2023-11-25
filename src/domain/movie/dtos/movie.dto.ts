import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { MovieEnum } from 'src/domain/movie/enums';

export class MovieDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(MovieEnum.MAX_NAME_LENGTH)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(MovieEnum.MAX_DIRECTOR_NAME_LENGTH)
  director: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MaxLength(MovieEnum.MAX_CATEGORY_NAME_LENGTH, { each: true })
  category: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MaxLength(MovieEnum.MAX_ACTORS_NAME_LENGTH, { each: true })
  actors: string[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(MovieEnum.MAX_DESCRIPTION_LENGTH)
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @Max(MovieEnum.MAX_YEAR)
  @Min(MovieEnum.MIN_YEAR)
  year: number;
}
