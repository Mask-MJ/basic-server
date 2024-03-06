import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppAbility, AbilityFactory } from './ability.factory';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY_KEY } from './abilities.decorator';

interface IAbilityHandler {
  handle(ability: AppAbility): boolean;
}

type AbilityHandlerCallback = (ability: AppAbility) => boolean;

export type AbilityHandler = IAbilityHandler | AbilityHandlerCallback;

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<AbilityHandler[]>(
        CHECK_ABILITY_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.abilityFactory.createForUser(user);
    return rules.every((handler) => this.execAbilityHandler(handler, ability));
  }

  private execAbilityHandler(handler: AbilityHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
