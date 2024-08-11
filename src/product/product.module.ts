import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ValidationService } from '../validation/validation.service';
import { ValidationModule } from 'src/validation/validation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ValidationModule,
    AuthModule,
    JwtModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
