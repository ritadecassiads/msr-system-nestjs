import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './schemas/supplier.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplier.name, schema: SupplierSchema },
    ]),
    AuthModule,
    JwtModule,
    ValidationModule,
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}
