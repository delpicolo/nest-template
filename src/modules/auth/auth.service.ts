import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(credentialsDto: CredentialsDto) {
    const id = await this.userService.checkCredentials(credentialsDto);

    if (id === null) throw new UnauthorizedException('Credenciais inválidas');

    const jwtPayload = { id };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }
}
