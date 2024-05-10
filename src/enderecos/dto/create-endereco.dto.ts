import { Institution } from "src/institution/entities/institution.entity";
import { User } from "src/user/entities/user.entity";
import { IsEmail, IsNotEmpty, IsNumber,IsOptional, IsString, Min } from "class-validator";

export class CreateEnderecoDto {

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
    @IsNumber()
    @IsOptional()
    userId?: number;
    @IsNumber()
    @IsOptional()
    institutionId?: number

}
