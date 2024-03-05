import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { APP_GUARD } from '@nestjs/core';
import { PoliciesGuard } from './common/policies/guards/policies.guard';
import { CaslModule } from './common/casl/casl.module';

@Module({
  imports: [SystemModule, CaslModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: PoliciesGuard }],
})
export class AppModule {}
