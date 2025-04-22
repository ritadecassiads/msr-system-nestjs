import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { ClientModule } from './client/client.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database/database.module';
import { SaleModule } from './sale/sale.module';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';
import { SupplierModule } from './supplier/supplier.module';
import { CategoryModule } from './category/category.module';
import { SeedService } from 'seed/seed.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    EmployeeModule,
    ClientModule,
    ProductModule,
    DatabaseModule,
    SaleModule,
    InvoiceModule,
    SupplierModule,
    CategoryModule,
    // AddressModule,
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule {}
