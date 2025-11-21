import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 8080;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Cache-Control',
    ],
    credentials: true,
    optionsSuccessStatus: 204,
  });

  await app.listen(port, () => {
    console.log(`🚀🚀🚀 Server running on http://localhost:${port}`);
  });
}

bootstrap();
