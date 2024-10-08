import { IsEmail, IsNotEmpty, IsNumber,IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { CreateEnderecoDto } from "src/enderecos/dto/create-endereco.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { User } from "src/user/entities/user.entity";
import { Role } from "src/role/role.entity";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {

  @IsOptional()
  registration?: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  cpf: string

  @IsString()
  funcao: string;

  role?: Role;

  @IsString()
  cep: string;

  @IsString()
  rua: string;

  @IsString()
  bairro: string;

  @IsString()
  numero: number;

  @IsString()
  cidade: string;

  user: User;
}
