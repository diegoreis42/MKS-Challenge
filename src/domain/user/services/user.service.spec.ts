import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserErrorsEnum } from '../enums';
import { IUserRepository, IUserServices } from '../interfaces';
import { User } from '../entities';
import { UserServices } from './user.service';

const mockUserRepository = {
  findOneByEmail: jest.fn(),
};

describe('UserServices', () => {
  let userServices: IUserServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserServices,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userServices = module.get<UserServices>(UserServices);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('verifyEmailExists', () => {
    it('should return false if email does not exist', async () => {
      const email = 'test@example.com';

      mockUserRepository.findOneByEmail.mockResolvedValue(null);

      const result = await userServices.verifyEmailExists(email);

      expect(result).toBe(false);
      expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw HttpException if email already exists', async () => {
      const email = 'existing@example.com';

      mockUserRepository.findOneByEmail.mockResolvedValue({} as User);

      await expect(userServices.verifyEmailExists(email)).rejects.toThrowError(
        new HttpException(
          UserErrorsEnum.EMAIL_ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('findByEmail', () => {
    it('should return user if email exists', async () => {
      const email = 'test2@example.com';
      const user = { id: '1', email };

      mockUserRepository.findOneByEmail.mockResolvedValue(user);

      const result = await userServices.findByEmail(email);

      expect(result).toEqual(user);
      expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw HttpException if email does not exist', async () => {
      const email = 'nonexistent@example.com';

      mockUserRepository.findOneByEmail.mockResolvedValue(null);

      await expect(userServices.findByEmail(email)).rejects.toThrowError(
        new HttpException(
          UserErrorsEnum.USER_NOT_EXISTS,
          HttpStatus.BAD_REQUEST,
        ),
      );

      expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(email);
    });
  });
});
