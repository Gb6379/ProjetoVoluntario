import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { AuthHelper } from './auth.helper';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.guard';
import { EnderecosModule } from 'src/enderecos/enderecos.module';
import { InstitutionModule } from 'src/institution/institution.module';

@Module({
  imports: [
    HttpModule,
    UserModule, 
    EnderecosModule,
    InstitutionModule,
    PassportModule.register({defaultStrategy: 'azureAd'}),
    JwtModule.register({ secret: 'secretKey',
    signOptions: { expiresIn: '60s' },}), 
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, 
    AuthHelper,
    AuthService,
    JwtService,
    JwtStrategy,
    LocalStrategy],
  exports: [
    AuthHelper,
    JwtService,
    PassportModule,
    AuthService
  ]
})
export class AuthModule {}
