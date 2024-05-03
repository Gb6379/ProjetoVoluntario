import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserToken } from 'src/responses/UserTokenResponse';
import { User } from 'src/user/entities/user.entity';
import { AuthHelper } from './auth.helper';
import { UserService } from 'src/user/user.service';
import { checkHttpException } from 'src/exceptions/http-exception';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
      private readonly usersService: UserService,
      private readonly authHelper: AuthHelper,
    ) {}


    async login(email: string, password: string): Promise<UserToken> {
        try {
          const user = await this.validateUser(email, password);
  
          return this.authHelper.generateToken(user);
        } catch(error) {
          checkHttpException(error, this.logger);
        }
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
