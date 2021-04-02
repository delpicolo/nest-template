import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerController } from './consumer.controller';
import { Consumer } from './consumer.entity';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Consumer])],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumersModule {}
