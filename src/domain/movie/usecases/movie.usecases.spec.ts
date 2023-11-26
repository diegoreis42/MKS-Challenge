import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MovieErrorsEnum } from '../enums';
import { IMovie, IMovieRepository, IMovieServices, IMovieUseCases } from '../interfaces';
import { MovieCreateDto, MovieUpdateDto } from '../dtos';
import { DeleteResult } from 'typeorm';
import { MovieUseCases } from './movie.usecases';

const mockMovieRepository = {
  findOneByName: jest.fn(),
  createOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

const mockMovieServices = {
  findMovie: jest.fn(),
};

const mockCacheService = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

describe('MovieUseCases', () => {
  let movieUseCases: IMovieUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieUseCases,
        {
          provide: IMovieRepository,
          useValue: mockMovieRepository,
        },
        {
          provide: IMovieServices,
          useValue: mockMovieServices,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    movieUseCases = module.get<MovieUseCases>(MovieUseCases);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMovie', () => {
    it('should create a movie if it does not already exist', async () => {
      const movieCreateDto: MovieCreateDto = {
        name: 'New Movie',
        director: 'fodase',
        category: ['fodase'],
        actors: ['fodase'],
        year: 1969
      };

      mockMovieRepository.findOneByName.mockResolvedValue(null);
      mockMovieRepository.createOne.mockResolvedValue(movieCreateDto);

      const result = await movieUseCases.createMovie(movieCreateDto);

      expect(result).toEqual(movieCreateDto);
      expect(mockMovieRepository.findOneByName).toHaveBeenCalledWith(
        movieCreateDto.name,
      );
      expect(mockMovieRepository.createOne).toHaveBeenCalledWith(movieCreateDto);
    });

    it('should throw HttpException if movie already exists', async () => {
     const movieCreateDto: MovieCreateDto = {
        name: 'New Movie',
        director: 'fodase',
        category: ['fodase'],
        actors: ['fodase'],
        year: 1969
      };

      mockMovieRepository.findOneByName.mockResolvedValue(movieCreateDto);

      await expect(movieUseCases.createMovie(movieCreateDto)).rejects.toThrowError(
        new HttpException(
          MovieErrorsEnum.MOVIE_ALREADY_EXISTS,
          HttpStatus.CONFLICT,
        ),
      );

      expect(mockMovieRepository.findOneByName).toHaveBeenCalledWith(
        movieCreateDto.name,
      );
      expect(mockMovieRepository.createOne).not.toHaveBeenCalled();
    });
  });

  describe('updateMovie', () => {
    it('should update movie and cache it', async () => {
      const movieUpdateDto: MovieUpdateDto = {
      };
      const movieId = '1';

      mockMovieServices.findMovie.mockResolvedValue({ id: movieId });
      mockCacheService.set.mockResolvedValue(undefined);
      mockMovieRepository.updateOne.mockResolvedValue(movieUpdateDto);

      const result = await movieUseCases.updateMovie(movieUpdateDto, movieId);

      expect(result).toEqual(movieUpdateDto);
      expect(mockMovieServices.findMovie).toHaveBeenCalledWith(movieId);
      expect(mockCacheService.set).toHaveBeenCalledWith(movieId, movieUpdateDto);
      expect(mockMovieRepository.updateOne).toHaveBeenCalledWith(
        movieUpdateDto,
        movieId,
      );
    });
  });

  describe('deleteMovie', () => {
    it('should delete movie and remove it from the cache', async () => {
      const movieId = '1';
      const movie = { id: movieId };

      mockMovieServices.findMovie.mockResolvedValue(movie);
      mockCacheService.del.mockResolvedValue(undefined);
      mockMovieRepository.deleteOne.mockResolvedValue({} as DeleteResult);

      const result = await movieUseCases.deleteMovie(movieId);

      expect(result).toEqual({} as DeleteResult);
      expect(mockMovieServices.findMovie).toHaveBeenCalledWith(movieId);
      expect(mockCacheService.del).toHaveBeenCalledWith(movieId);
      expect(mockMovieRepository.deleteOne).toHaveBeenCalledWith(movie);
    });
  });
});

