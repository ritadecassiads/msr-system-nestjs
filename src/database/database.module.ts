import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/msr-system', {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('Conectado com o MongoDB!');
        });
        connection.on('error', (error: any) => {
          console.error('Erro na conexão com o MongoDB:', error);
        });
        return connection;
      },
    }),
  ],
})
export class DatabaseModule {}
