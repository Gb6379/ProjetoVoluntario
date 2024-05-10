import { Institution } from "src/institution/entities/institution.entity";
import { User } from "src/user/entities/user.entity";

export interface ValidadeLoginResponse {
    user?: User
    institution?: Institution
}