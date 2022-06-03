import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://pgbqxtiz:U4isvuX5zA5u5k1NOEkh35g8uzAQhsdQ@cow.rmq2.cloudamqp.com/pgbqxtiz'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
