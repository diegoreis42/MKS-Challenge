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
import { MovieCreateDto } from 'src/domain/movie/dtos';
import { IMovieRepository, IMovieUseCases } from 'src/domain/movie/interfaces';

@UsePipes(new ValidationPipe())
@Controller('movie')
export class MovieController {
  constructor(
    private movieUseCases: IMovieUseCases,
    private movieRepository: IMovieRepository
    ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() movieDto: MovieCreateDto) {
    return this.movieUseCases.createMovie(movieDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.movieRepository.findAll();
  }

  @Get('/:id')
  getOne(@Param() movieId) {
    // retorna um filme por id
  }

  @Patch('/:id')
  updateOne(@Body() movieDto, @Param() movieId) {
    // atualiza um filme
  }

  @Delete('/:id')
  deleteOne(@Param() movieId) {
    // deleta um filme
  }
}