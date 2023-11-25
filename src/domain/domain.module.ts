import { Module } from '@nestjs/common';
import { AuthModule } from 'src/domain/auth/auth.module';
import { UserModule } from 'src/domain/user';

@Module({
  imports: [UserModule, AuthModule],
})
export class DomainModule {}
