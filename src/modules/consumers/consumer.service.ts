import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Consumer } from './consumer.entity';

@Injectable()
export class ConsumerService extends TypeOrmCrudService<Consumer> {
  constructor(@InjectRepository(Consumer) repo) {
    super(repo);
  }
}
