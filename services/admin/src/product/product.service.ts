import { Inject, Injectable, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProduct, EditProduct } from './dto';
import { Product } from './entities';

@Injectable()
export class ProductService {
    /**
     *
     */
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy 
    ) {}

    async getAllProduct(): Promise<Product[]>{
        this.client.emit('hello', "Hello from RMQ");
        return this.productRepository.find();
    }

    async createProduct(model: CreateProduct): Promise<Product>{
        const product = await this.productRepository.save(model);
        this.client.emit('product_created', product);
        return product;
    }

    async getProductById(id: number): Promise<Product>{
        return this.productRepository.findOne({id})
    }

    async editProductById(id: number, model: EditProduct ): Promise<any>{
        let product: Product;
        try{
            await this.productRepository.update(id, model);
            product = await this.productRepository.findOne({id});
        }catch(e){
            console.log('uuuuu', e)
            //throw new Error(e); 
        }
        this.client.emit('product_edited', product);
        return product;
    }

    async deleteProductById(id: number): Promise<any>{
        await this.productRepository.delete(id);
        this.client.emit('product_deleted', id);
    }

    async likeProductById(id: number): Promise<any>{
        let product: Product = await this.productRepository.findOne(id);
        product.likes += 1; 
        return this.productRepository.update(id, product);
    }
}
