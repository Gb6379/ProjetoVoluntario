import { User } from "src/user/entities/user.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RoleEnum } from "./role.enum";

@Entity()
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    title: string;

    @OneToMany((type) => User, (user) => user.role)
    users: User[];

    constructor(role?: RoleEnum) {
        super();

        if(role) {
            this.id = role,
            this.title = RoleEnum[role]
        }
    }

}