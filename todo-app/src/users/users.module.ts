import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthorizationMiddleware } from './users.middlewares';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

@Module({
  providers: [UsersService, AuthorizationMiddleware],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, AuthorizationMiddleware, UsersService],
})
export class UsersModule {}
