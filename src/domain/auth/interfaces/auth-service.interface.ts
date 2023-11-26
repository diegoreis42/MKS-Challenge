import { UserReturnDto } from '../../user/dtos';

export abstract class IAuthService {
  abstract createAccessToken(user: UserReturnDto);
  abstract verify(token): Promise<string>;
  abstract extractTokenFromHeader(req): string | undefined;
}
