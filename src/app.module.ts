import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/sistema_msr_new'),
    //AuthModule,
    UserModule,
    ClientModule,
    ProductModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
