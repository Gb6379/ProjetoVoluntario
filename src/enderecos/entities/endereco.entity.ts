import { Institution } from "src/institution/entities/institution.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cep: string;

    @Column()
    rua: string;

    @Column()
    bairro: string;

    @Column()
    numero: number;

    @Column()
    cidade: string;

    @ManyToOne(() => User, (user) => user.enderecos, { nullable: true })
    user: User;

    @ManyToOne(() => Institution, (institution) => institution.enderecos, { nullable: true })
    institution: Institution;
}
