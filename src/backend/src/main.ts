import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const env = configService.get<string>('NODE_ENV');

  if (env === 'production') {
    app.useLogger(['warn', 'error']);
  } else {
    app.useLogger(['error', 'warn', 'debug']);
  }

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(
    `\x1b[32m[Bootstrap] Aplicação rodando em ambiente de [${env}] na porta ${port}`,
  );
}
bootstrap();
