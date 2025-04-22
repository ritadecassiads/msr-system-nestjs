import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carrega as variáveis de ambiente do .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Pega a URI do banco do .env
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
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
