import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateProduct, EditProduct } from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    /**
     *
     */
    constructor(
        private productService: ProductService
        ) {}

    @Get()
    getAllProducts(){
        return this.productService.getAllProduct();
    }

    @Post()
    createProduct(@Body() model: CreateProduct){
        return this.productService.createProduct(model);
    }

    @Get(':id')
    getProductById(@Param('id') id: number){
        return this.productService.getProductById(id);
    }

    @Put(':id')
    editProductById(@Param('id') id: number, @Body() model: EditProduct){
        return this.productService.editProductById(id, model);
    }

    @Delete(':id')
    deleteProductById(@Param('id') id: number){
        return this.productService.deleteProductById(id);
    }

    @Post(':id/like')
    likeProductById(@Param('id') id: number){
        return this.productService.likeProductById(id);
    }
}
