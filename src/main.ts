import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Configuração do CORS
    app.enableCors({
      origin: 'http://localhost:4200', // Permitir apenas essa origem
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
      allowedHeaders: 'Content-Type, Accept, Authorization', // Cabeçalhos permitidos
    });
    
  await app.listen(3000);
  console.log('Servidor rodando na porta 3000');
}
bootstrap();
