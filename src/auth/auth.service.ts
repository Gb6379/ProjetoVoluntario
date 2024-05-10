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
import { CreateInstitutionDto } from 'src/institution/dto/create-institution.dto';
import { RegisterInstitutionDto } from './dto/registerInstitution.dto';
import { InstitutionService } from 'src/institution/institution.service';
import { ValidadeLoginResponse } from 'src/responses/validadeLoginResponse';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly authHelper: AuthHelper,
    private readonly enderecoService: EnderecosService,
    private readonly institutionService: InstitutionService
  ) { }


  async login(email: string, password: string): Promise<UserToken> {
    try {
      console.log(email,password)
      const subject = await this.validateUser(email, password);
      if(subject instanceof User) {
        return this.authHelper.generateToken(subject);
      }
        return this.authHelper.generateInstitutionToken(subject)
    } catch (error) {
      checkHttpException(error, this.logger);
    }
  }

  async register(registerDto: RegisterDto): Promise<RegisterReponse> {

    const user: CreateUserDto = Object.assign({}, registerDto);

    const createdUser = await this.usersService.create(user)

    const endereco: CreateEnderecoDto = Object.assign({}, registerDto, { user: createdUser.user });

    await this.enderecoService.addEnderecoVoluntario(endereco)

    return {
      message: "usuario criado com sucesso"
    }
  }

  async registerInstitutions(registerInsitituionDto: RegisterInstitutionDto):Promise<RegisterReponse> {
      const institution: CreateInstitutionDto = Object.assign({}, registerInsitituionDto)

      const createdInstitution = await this.institutionService.create(institution)

      const endereco: CreateEnderecoDto = Object.assign({}, registerInsitituionDto, { institution: createdInstitution.institution });

      await this.enderecoService.addEnderecoInstitution(endereco)

      return {
        message: "instituicao criada com sucesso"
      }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const inst = await this.institutionService.findInstitutionByEmail(email)
    if (user) {
      if (this.authHelper.isPasswordValid(password, user.password)) {
        return user;
      }
      
    }

    else if(inst) {
      if (this.authHelper.isPasswordValid(password, inst.password)) {
        return inst;
    }
   

    //throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  }

}
