import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Consumer } from './consumer.entity';
import { ConsumerService } from './consumer.service';

@Crud({
  model: {
    type: Consumer,
  },
})
@Controller('consumers')
@ApiTags('consumers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ConsumerController implements CrudController<Consumer> {
  constructor(public service: ConsumerService) { }
}
