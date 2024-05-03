import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from 'src/payloads/UserPayload';
import { UserToken } from 'src/responses/UserTokenResponse';


@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return this.repository.findOne(decoded.id);
  }

  // Generate JWT Token
  public generateToken(user: User): UserToken {
    const payload: UserPayload = {
      id: user.id,
      //roleId: user.role.id,
    };

    return {
      access_token: this.jwt.sign(payload, { secret: process.env.JWT_SECRET })
    };
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }

  public async getUserDataFromRequest(request: Request): Promise<any> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        
    if(!token) {
      throw new HttpException({ reason: 'Token not provided.' }, HttpStatus.BAD_REQUEST);
    }

    return this.decode(token);
  }

  public async getTokenFromRequest(request: Request): Promise<any> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        
    if(!token) {
      throw new HttpException({ reason: 'Token not provided!' }, HttpStatus.BAD_REQUEST);
    }

    return token;
  }

}
