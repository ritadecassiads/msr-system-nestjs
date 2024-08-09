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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/system_msr'),
    AuthModule,
    EmployeeModule,
    ClientModule,
    ProductModule,
    DatabaseModule,
    SaleModule,
    InvoiceModule,
    SupplierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
