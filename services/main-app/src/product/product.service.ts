import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto';
import { Product } from './entities';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProductService {
    /**
     *
     */
    constructor(
        @InjectModel(Product.name) private readonly ProductModel: Model<Product>,
        private httpService: HttpService
    ) {}

    async getAllProduct(): Promise<Product[]>{
        return this.ProductModel.find().exec();
    }

    async productCreated(data: Product): Promise<Product>{
        return new this.ProductModel(data).save();
    }

    async productEdited(data: Product): Promise<Product>{
        return this.ProductModel.findOneAndUpdate({id:data.id},data);
    }

    async productDeleted(id: number): Promise<void>{
        return this.ProductModel.findOneAndDelete({id});
    }

    async like(id: number) {
        return this.httpService.post(`http://localhost:3001/api/products/${id}/like`);
    }
    
    async likeProduct(id: number): Promise<any>{
        let product = await this.ProductModel.findOne({id});
        let response = await this.like(id);
        response.subscribe((e)=> console.log(e.data, e.statusText));
        return this.ProductModel.findOneAndUpdate({id: product.id}, {likes: product.likes + 1});
    }
}
