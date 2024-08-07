import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { SaleModule } from './sale/sale.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/system_msr'),
    AuthModule,
    UserModule,
    ClientModule,
    ProductModule,
    DatabaseModule,
    SaleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
