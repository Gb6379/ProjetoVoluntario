import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserToken } from 'src/responses/UserTokenResponse';
import { AuthService } from './auth.service';
import { Required } from 'src/custom-decorators/required.decorator';
import { RegisterDto } from './dto/register.dto';
import { RegisterReponse } from 'src/responses/RegisterResponse';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    //@ApiOkResponse(USER_TOKEN_RESPONSE)
    @Post('login')
    async login(@Required('email') email: string, @Required('password') password: string): Promise<UserToken> {
      return this.authService.login(email, password);
    }

    @Post('register') 
    async register(@Body() registerDto: RegisterDto):Promise<RegisterReponse> {
        return await this.authService.register(registerDto)
     }
  
  
}
