import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Institution } from "src/institution/entities/institution.entity";
import { InstitutionService } from "src/institution/institution.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService,
                private readonly institutionService: InstitutionService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        if(!payload || !payload?.id) {
            return null;
        }

        if(await this.userService.findUser(payload.id)) {
            return { userId: payload.id };
        }
        
        if(await this.institutionService.findInstitution(payload.id)) {
            return { institutionId: payload.id };
        }
        return null;
    }
}