import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [...usersProviders, UsersService],
  controllers: [UsersController],
  imports: [DatabaseModule],
})
export class UsersModule {}
