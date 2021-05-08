import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthorizationMiddleware } from './users/users.middlewares';
import { DatabaseModule } from './database/database.module';
import { BoardsModule } from './boards/boards.module';
import { UsersController } from './users/users.controller';
import helmet from 'helmet';

@Module({
  imports: [UsersModule, DatabaseModule, BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        { path: 'users/:username', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.POST },
      )
      .forRoutes(UsersController);
  }
}
