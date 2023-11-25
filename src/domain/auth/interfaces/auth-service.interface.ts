import { UserReturnDto } from 'src/domain/user/dtos';

export abstract class IAuthService {
  abstract createAccessToken(user: UserReturnDto);
  abstract verify(token): Promise<string>;
  abstract extractTokenFromHeader(req): string | undefined;
}
