import { IsEmail, IsNotEmpty, IsNumber,IsOptional, IsString, Min } from "class-validator";
import { Role } from "src/role/role.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Institution } from "src/institution/entities/institution.entity";

export class RegisterInstitutionDto {

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  cnpj: string

  @IsString()
  tipo: string;

  @IsString()
  info: string;

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

  institution: Institution
}