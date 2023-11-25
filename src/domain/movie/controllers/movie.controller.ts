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
import { AuthGuard } from 'src/domain/auth/guards';
import { MovieCreateDto, MovieId } from 'src/domain/movie/dtos';
import { Movie } from 'src/domain/movie/entities';
import {
  IMovieRepository,
  IMovieServices,
  IMovieUseCases,
} from 'src/domain/movie/interfaces';
import { DeleteResult } from 'typeorm';

@UsePipes(new ValidationPipe())
@Controller('movie')
export class MovieController {
  constructor(
    private movieUseCases: IMovieUseCases,
    private movieRepository: IMovieRepository,
    private movieServices: IMovieServices,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() movieDto: MovieCreateDto) {
    return this.movieUseCases.createMovie(movieDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll(): Promise<Movie[]> {
    return this.movieRepository.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  getOne(@Param() movieId: MovieId): Promise<Movie> {
    return this.movieServices.findMovie(movieId.id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateOne(@Body() movieDto, @Param() movieId: MovieId) {
    return this.movieUseCases.updateMovie(movieDto, movieId.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteOne(@Param() movieId: MovieId): Promise<DeleteResult> {
    return this.movieUseCases.deleteMovie(movieId.id);
  }
}
