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
import { BoardsModule } from './boards/boards.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      dropSchema: true,
      synchronize: true,
    }),
    UsersModule,
    BoardsModule,
  ],
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
