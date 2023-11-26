import { Test, TestingModule } from '@nestjs/testing';
import { IMovieRepository, IMovieServices } from '../interfaces';
import { MovieServices } from './movie.services';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MovieErrorsEnum } from '../enums';

describe('MovieService', () => {
  let movieServices: IMovieServices;
  const mockMovieRepository = {
    findOne: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieServices,
        {
          provide: IMovieRepository,
          useValue: mockMovieRepository,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    movieServices = module.get<MovieServices>(MovieServices);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defiend', () => {
    expect(movieServices).toBeDefined();
  });


describe('findMovie', () => {
    it('should return movie from cache if available', async () => {
      const movieId = '1';
      const cachedMovie = { id: '1', title: 'Mock Movie' };

      mockCacheService.get.mockResolvedValue(cachedMovie);

      const result = await movieServices.findMovie(movieId);

      expect(result).toEqual(cachedMovie);
      expect(mockCacheService.get).toHaveBeenCalledWith(movieId);
      expect(mockMovieRepository.findOne).not.toHaveBeenCalled();
      expect(mockCacheService.set).not.toHaveBeenCalled();
    });

    it('should return movie from repository and cache it if not in cache', async () => {
      const movieId = '1';
      const movieFromRepository = { id: '1', title: 'Mock Movie' };

      mockCacheService.get.mockResolvedValue(null);
      mockMovieRepository.findOne.mockResolvedValue(movieFromRepository);

      const result = await movieServices.findMovie(movieId);

      expect(result).toEqual(movieFromRepository);
      expect(mockCacheService.get).toHaveBeenCalledWith(movieId);
      expect(mockMovieRepository.findOne).toHaveBeenCalledWith(movieId);
      expect(mockCacheService.set).toHaveBeenCalledWith(movieId, movieFromRepository);
    });

    it('should throw HttpException if movie not found in repository', async () => {
      const movieId = '1';

      mockCacheService.get.mockResolvedValue(null);
      mockMovieRepository.findOne.mockResolvedValue(null);

      await expect(movieServices.findMovie(movieId)).rejects.toThrowError(
        new HttpException(MovieErrorsEnum.MOVIE_NOT_EXISTS, HttpStatus.NOT_FOUND),
      );

      expect(mockCacheService.get).toHaveBeenCalledWith(movieId);
      expect(mockMovieRepository.findOne).toHaveBeenCalledWith(movieId);
      expect(mockCacheService.set).not.toHaveBeenCalled();
    });
  });
});