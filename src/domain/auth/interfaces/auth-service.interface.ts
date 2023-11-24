export abstract class IAuthService {
  abstract createAccessToken(user: UserDto);
  abstract verify(token): Promise<string>;
  abstract extractTokenFromHeader(req): string | undefined;
}
