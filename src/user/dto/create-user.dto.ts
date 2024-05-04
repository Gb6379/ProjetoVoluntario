import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { isString } from "util";
export class CreateUserDto {

    @IsOptional()
    registration: string;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    cpf: string

    @ApiProperty({ required: false })
    @IsOptional()
    password: string;

 


}
