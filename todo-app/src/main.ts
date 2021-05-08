import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  await app.listen(3000);
}
dotenv.config();
bootstrap();
