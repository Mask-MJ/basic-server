import { SetMetadata } from '@nestjs/common';
import { AbilityHandler } from './abilities.guard';

export const CHECK_ABILITY_KEY = 'check_ability';

export const CheckAbilities = (...handlers: AbilityHandler[]) =>
  SetMetadata(CHECK_ABILITY_KEY, handlers);
