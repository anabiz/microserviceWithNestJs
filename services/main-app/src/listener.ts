import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://pgbqxtiz:U4isvuX5zA5u5k1NOEkh35g8uzAQhsdQ@cow.rmq2.cloudamqp.com/pgbqxtiz'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  app.listen()
}
bootstrap();
