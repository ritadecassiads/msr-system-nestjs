import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from '../client/schemas/client.schema';
import { Employee, EmployeeSchema } from '../employee/schemas/employee.schema';

import { ValidationService } from '../validation/validation.service';
import { Product, ProductSchema } from '../product/schemas/product.schema';
import { Supplier, SupplierSchema } from '../supplier/schemas/supplier.schema';
import { Category, CategorySchema } from '../category/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [ValidationService],
  exports: [ValidationService, MongooseModule],
})
export class ValidationModule {}
