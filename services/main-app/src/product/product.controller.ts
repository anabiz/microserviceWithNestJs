import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateProductDto } from './dto';
import { Product } from './entities';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    /**
     *
     */
    constructor(private productService: ProductService) {}

    @Get()
    async getAllProduct(): Promise<Product[]>{
        return this.productService.getAllProduct();
    }
    
    @Post(':id/like')
    async likeProduct(@Param('id') id: number ): Promise<Product>{
        return this.productService.likeProduct(id);
    }

    @EventPattern('product_created')
    async productCreated(data: Product){
        return this.productService.productCreated(data);
    }

    @EventPattern('product_edited')
    async productEdited(data: Product){
        return this.productService.productEdited(data);
    }
    
    @EventPattern('product_deleted')
    async productDeleted(id: number){
        return this.productService.productDeleted(id);
    }

    @EventPattern('hello')
    async pingRMQ(data: string){
        console.log(data)
    }
}
