import { IsEmail, IsNotEmpty, IsNumber,IsOptional, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/role/role.entity";
export class CreateInstitutionDto {

    @IsString()
    name: string;
  
    @IsString()
    email: string;
  
    @IsString()
    phone: string;
  
    @IsString()
    cnpj: string
  
    @IsString()
    info: string;
  
    @IsString()
    password: string;
  
    @IsString()
    hours: string;
  
    @IsString()
    itensNecessarios: string;
  
    @IsString()
    voluntarioStatus: string;
  
    @IsString()
    doacoeStatus: string;
  
    @IsString()
    servicosNecessarios: string;
  
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
}
