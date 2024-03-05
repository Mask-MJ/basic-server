import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
// import { RolesController } from './roles/roles.controller';
// import { RolesService } from './roles/roles.service';
// import { HashingService } from 'src/iam/hashing/hashing.service';
// import { BcryptService } from 'src/iam/hashing/bcrypt.service';
import { PrismaModule } from 'nestjs-prisma';
import { MenusService } from './menus/menus.service';
import { MenusController } from './menus/menus.controller';
import { RouterModule } from '@nestjs/core';
import { CaslModule } from 'src/common/casl/casl.module';
@Module({
  imports: [
    CaslModule,
    PrismaModule,
    RouterModule.register([{ path: 'system', module: SystemModule }]),
  ],

  providers: [
    // { provide: HashingService, useClass: BcryptService },
    // RolesService,
    UsersService,
    MenusService,
  ],
  controllers: [UsersController, MenusController],
})
export class SystemModule {}
