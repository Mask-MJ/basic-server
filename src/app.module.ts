import { Module } from '@nestjs/common';
import { CaslModule } from './common/casl/casl.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CaslModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
