import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Endereco } from "src/enderecos/entities/endereco.entity";
import { Role } from "src/role/role.entity";
import { isString } from "util";
export class CreateUserDto {

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
    @IsOptional()
    password?: string;

    @IsOptional()
    role?: Role;


}
