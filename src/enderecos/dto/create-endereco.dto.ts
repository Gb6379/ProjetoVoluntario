import { Institution } from "src/institution/entities/institution.entity";
import { User } from "src/user/entities/user.entity";

export class CreateEnderecoDto {


    cep: string;

    rua: string;

    bairro: string;

    numero: number;

    cidade: string;

    user?: User;

    institution?: Institution

}
