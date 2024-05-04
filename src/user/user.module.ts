import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthHelper } from 'src/auth/auth.helper';
import { JwtService } from '@nestjs/jwt';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  
    //PassportModule.register({defaultStrategy: 'azureAd'}),
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService, AuthHelper, JwtService],
  exports: [UserService]
})
export class UserModule {}
