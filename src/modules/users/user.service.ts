import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from 'src/modules/auth/dto/credentials.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { UserRole } from './user-roles.enum';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<string> {
    const { email, password } = credentialsDto;
    const user = await this.repo.findOne({ email, status: true });

    if (user && (await user.checkPassword(password))) {
      return user.id;
    } else {
      return null;
    }
  }
}

// @Injectable()
// export class UserService {
//   private readonly UNIQUE_VIOLATION = '23505';

//   public constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     if (createUserDto.password != createUserDto.passwordConfirmation)
//       throw new UnprocessableEntityException('As senhas não conferem');

//     const { email, name, password, role } = createUserDto;

//     const user = this.userRepository.create();

//     user.email = email;
//     user.name = name;
//     user.role = role;
//     user.status = true;
//     user.confirmationToken = crypto.randomBytes(32).toString('hex');
//     user.salt = await bcrypt.genSalt();
//     user.password = await this.hashPassword(password, user.salt);

//     try {
//       await user.save();
//       delete user.password;
//       delete user.salt;
//       return user;
//     } catch (error) {
//       if (error.code.toString() === this.UNIQUE_VIOLATION) {
//         throw new ConflictException('Endereço de email já está em uso');
//       } else {
//         throw new InternalServerErrorException(
//           'Erro ao salvar o usuário no banco de dados',
//         );
//       }
//     }
//   }

//   async findAll(): Promise<User[]> {
//     return await this.userRepository.find({
//       select: ['id', 'name', 'email', 'status', 'role'],
//     });
//   }

//   async findOne(id: number): Promise<User> {
//     const user = await this.userRepository.findOne(id, {
//       select: ['name', 'email', 'status', 'role'],
//     });

//     if (!user) return null;

//     return user;
//   }

//   async findUserById(userId: string): Promise<User> {
//     const user = await this.userRepository.findOne(userId, {
//       select: ['email', 'name', 'role', 'id'],
//     });

//     if (!user) throw new NotFoundException('Usuário não encontrado');

//     return user;
//   }

//   async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
//     const { email, password } = credentialsDto;
//     const user = await this.userRepository.findOne({ email, status: true });

//     if (user && (await user.checkPassword(password))) {
//       return user;
//     } else {
//       return null;
//     }
//   }

//   async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
//     const user = await this.userRepository.findOne(id);

//     if (user.role != UserRole.ADMIN && user.id.toString() != id) {
//       throw new ForbiddenException(
//         'Você não tem autorização para acessar esse recurso',
//       );
//     }

//     const { name, email, role, status } = updateUserDto;
//     user.name = name ? name : user.name;
//     user.email = email ? email : user.email;
//     user.role = role ? role : user.role;
//     user.status = status === undefined ? user.status : status;
//     try {
//       await user.save();
//       return user;
//     } catch (error) {
//       throw new InternalServerErrorException(
//         'Erro ao salvar os dados no banco de dados',
//       );
//     }
//   }

//   async deleteUser(userId: string) {
//     const result = await this.userRepository.delete({ id: userId });
//     if (result.affected === 0) {
//       throw new NotFoundException(
//         'Não foi encontrado um usuário com o ID informado',
//       );
//     }
//   }

//   private async hashPassword(password: string, salt: string): Promise<string> {
//     return bcrypt.hash(password, salt);
//   }
// }
