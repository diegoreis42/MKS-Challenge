import { ApiProperty } from '@nestjs/swagger';
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
import { MovieEnum } from '../enums';

export class MovieDto {
  @ApiProperty({
    example: 'c3716a2e-2a1a-4dd1-89f6-511772ea3bfb',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'Lord Of The Rings',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(MovieEnum.MAX_NAME_LENGTH)
  name: string;

  @ApiProperty({
    example: 'Peter Jackson',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(MovieEnum.MAX_DIRECTOR_NAME_LENGTH)
  director: string;

  @ApiProperty({
    example: '["Fantasy", "action"]',
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MaxLength(MovieEnum.MAX_CATEGORY_NAME_LENGTH, { each: true })
  category: string[];

  @ApiProperty({
    example: '["Elijah Wood", "Christopher Lee"]',
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MaxLength(MovieEnum.MAX_ACTORS_NAME_LENGTH, { each: true })
  actors: string[];

  @ApiProperty({
    example:
      'The Lord of the Rings is a series of three epic fantasy adventure films directed by Peter Jackson, based on the novel The Lord of the Rings by British author J. R. R. Tolkien...etc',
    required: false,
  })
  @IsString()
  @MaxLength(MovieEnum.MAX_DESCRIPTION_LENGTH)
  description: string;

  @ApiProperty({
    example: 2001,
    required: true,
    maximum: MovieEnum.MAX_YEAR,
    minimum: MovieEnum.MIN_YEAR,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @Max(MovieEnum.MAX_YEAR)
  @Min(MovieEnum.MIN_YEAR)
  year: number;
}
