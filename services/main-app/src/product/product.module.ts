import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    HttpModule,
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
