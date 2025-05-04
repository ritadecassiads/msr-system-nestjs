import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './common/exceptions/validation.exception';
import { SeedService } from '../seed/seed.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Permite a transformação dos dados de entrada em instâncias de classe
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:4200',
        'https://msr-sys.netlify.app',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // if (process.env.NODE_ENV !== 'production') {
    const seedService = app.get(SeedService);
    await seedService.seed();
  // }

  const config = new DocumentBuilder()
    .setTitle('Documentação API MSR')
    .setDescription('Bem-vindo à documentação da API do sistema de gestão MSR. Aqui você encontrará informações detalhadas sobre os endpoints disponíveis, incluindo métodos, parâmetros, e exemplos de uso. Esta API é projetada para gerenciar recursos do sistema MSR de forma eficiente e segura.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  fs.writeFileSync('./swagger.json', JSON.stringify(document)); // exporta a documentação para um arquivo JSON


  await app.listen(process.env.PORT || 3000);
  console.log('Servidor rodando na porta 3000');
}
bootstrap();
