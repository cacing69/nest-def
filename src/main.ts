import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import fastifyCookie from 'fastify-cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });
  app.use(cookieParser());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
