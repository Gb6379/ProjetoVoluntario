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
  phone: string;

  @IsString()
  cpf: string

  @IsString()
  funcao: string;

  @ApiProperty({ required: false })
  password?: string;

  role?: Role;

  cep: string;

  rua: string;

  bairro: string;

  numero: number;

  cidade: string;

  user: User;
}
