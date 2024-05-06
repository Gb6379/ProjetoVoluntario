import { Endereco } from "src/enderecos/entities/endereco.entity";
import { Role } from "src/role/role.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Institution extends BaseEntity { 

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    name: string;

    @Column()
    servicosNec: string;

    @Column()
    numeroVoluntariosNec: number;

    @OneToMany((type) => Endereco, (enderecos) => enderecos.user)
    enderecos: Endereco[];

    @ManyToOne(() => Role, (role) => role.institution)
    role: Role;

   
}
