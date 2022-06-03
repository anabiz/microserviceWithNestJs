import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/admin', {autoCreate: true}),
    ProductModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
