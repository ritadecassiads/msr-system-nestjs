import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './common/exceptions/validation.exception';
import { SeedService } from '../seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Permite a transformação dos dados de entrada em instâncias de classe
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );

  app.enableCors({
    origin: 'http://localhost:4200', // URL do seu frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Execute o script de seed
  const seedService = app.get(SeedService);
  await seedService.seed();

  // if (process.env.NODE_ENV !== 'production') {
  //   const seedService = app.get(SeedService);
  //   await seedService.seed();
  // }

  await app.listen(process.env.PORT || 3000);
  console.log('Servidor rodando na porta 3000');
}
bootstrap();
