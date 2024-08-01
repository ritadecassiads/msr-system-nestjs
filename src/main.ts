import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Permite a transformação dos dados de entrada em instâncias de classe
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );

  //app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
  console.log('Servidor rodando na porta 3000');
}
bootstrap();
