import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { FirebaseAdmin } from './infra/singletons/firebase.admin.singleton';

async function bootstrap() {
  FirebaseAdmin.get();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  await app.listen(3000);
}
bootstrap();
