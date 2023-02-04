import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TypeormExceptionFilter } from './common/filters/typeorm-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { CronService } from './modules/cron/cron.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.enableCors();
  const cronService = app.get(CronService);
  cronService.checkClosedAccounts();
  cronService.sendUnreadNotifications();
  cronService.checkNotification();
  cronService.updateNotification();
  const options = new DocumentBuilder()
    .setTitle('Xpectum')
    .setDescription('The Xpectum API description')
    .setVersion('1.0')
    .setBasePath(config.get('swagger.basePath'))
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(
      app.get(Reflector),
    ),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new TypeormExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
