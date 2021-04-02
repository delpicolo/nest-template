import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/modules/common/guards/roles.guard';
import { UpdateUserDto } from './dto/update-users.dto';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { Controller, UseGuards } from '@nestjs/common';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
})
@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
export class UserController implements CrudController<User> {
  constructor(public service: UserService) { }
}
