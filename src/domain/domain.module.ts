import { Module } from '@nestjs/common';
import { UserModule } from 'src/domain/user';

@Module({
  imports: [UserModule],
})
export class DomainModule {}
