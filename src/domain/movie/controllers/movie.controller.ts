import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/domain/auth/guards';
import { MovieCreateDto, MovieId, MovieUpdateDto } from 'src/domain/movie/dtos';
import { Movie } from 'src/domain/movie/entities';
import {
  IMovie,
  IMovieRepository,
  IMovieServices,
  IMovieUseCases,
} from 'src/domain/movie/interfaces';
import { DeleteResult } from 'typeorm';

@UsePipes(new ValidationPipe())
@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(
    private movieUseCases: IMovieUseCases,
    private movieRepository: IMovieRepository,
    private movieServices: IMovieServices,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Movie was successfully created.' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden, verify the JWT token in the Authentication header.',
  })
  create(@Body() movieDto: MovieCreateDto): Promise<IMovie> {
    return this.movieUseCases.createMovie(movieDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Get all movies' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden, verify the JWT token in the Authentication header.',
  })
  getAll(): Promise<Movie[]> {
    return this.movieRepository.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'The movie was found.' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden, verify the JWT token in the Authentication header.',
  })
  @ApiResponse({
    status: 404,
    description:
      'The movie was not found',
  })
  getOne(@Param() movieId: MovieId): Promise<Movie> {
    return this.movieServices.findMovie(movieId.id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'The movie was successfully updated.' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden, verify the JWT token in the Authentication header.',
  })
  @ApiResponse({
    status: 404,
    description:
      'The movie was not found',
  })
  updateOne(@Body() movieDto: MovieUpdateDto, @Param() movieId: MovieId) {
    return this.movieUseCases.updateMovie(movieDto, movieId.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'The movie was successfully deleted' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden, verify the JWT token in the Authentication header.',
  })
  @ApiResponse({
    status: 404,
    description:
      'The movie was not found',
  })
  deleteOne(@Param() movieId: MovieId): Promise<DeleteResult> {
    return this.movieUseCases.deleteMovie(movieId.id);
  }
}
