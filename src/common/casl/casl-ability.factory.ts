import { Injectable } from '@nestjs/common';
import { PureAbility, AbilityBuilder, ExtractSubjectType } from '@casl/ability';
import { createPrismaAbility, Subjects, PrismaQuery } from '@casl/prisma';
import { User, Menu } from '@prisma/client';

export type AppSubjects = 'all' | Subjects<{ User: User; Menu: Menu }>;
export type AppAbility = PureAbility<[string, AppSubjects], PrismaQuery>;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );
    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }
    // can(Action.Update, Article, { authorId: user.id });
    cannot(Action.Delete, 'Menu');
    return build({
      detectSubjectType: (object) =>
        object.constructor as unknown as ExtractSubjectType<AppSubjects>,
    });
  }
}
