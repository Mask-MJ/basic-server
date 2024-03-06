import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilityModule } from './common/ability/ability.module';
import { AbilitiesGuard } from './common/ability/abilities.guard';

@Module({
  imports: [SystemModule, AbilityModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AbilitiesGuard }],
})
export class AppModule {}
