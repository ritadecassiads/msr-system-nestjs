import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './schemas/client.schema';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ValidationModule } from '../validation/validation.module';
import { SaleModule } from 'src/sale/sale.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    ValidationModule,
    AuthModule,
    JwtModule,
    SaleModule
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
