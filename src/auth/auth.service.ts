import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserToken } from 'src/responses/UserTokenResponse';
import { User } from 'src/user/entities/user.entity';
import { AuthHelper } from './auth.helper';
import { UserService } from 'src/user/user.service';
import { checkHttpException } from 'src/exceptions/http-exception';
import { EnderecosService } from 'src/enderecos/enderecos.service';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateEnderecoDto } from 'src/enderecos/dto/create-endereco.dto';
import { RegisterReponse } from 'src/responses/RegisterResponse';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly authHelper: AuthHelper,
    private readonly enderecoService: EnderecosService
  ) { }


  async login(email: string, password: string): Promise<UserToken> {
    try {
      const user = await this.validateUser(email, password);

      return this.authHelper.generateToken(user);
    } catch (error) {
      checkHttpException(error, this.logger);
    }
  }

  async register(registerDto: RegisterDto): Promise<RegisterReponse> {

    const user: CreateUserDto = Object.assign({}, registerDto);

    const createdUser = await this.usersService.create(user)

    const endereco: CreateEnderecoDto = Object.assign({}, registerDto, { user: createdUser.user });

    await this.enderecoService.create(endereco)

    return {
      message: "usuario criado com sucesso"
    }
  }

  async registerInstitutions() {

  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    if (this.authHelper.isPasswordValid(password, user.password)) {
      return user;
    }

    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }



}
