import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Institution extends BaseEntity { 

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    name: string;

    @Column({ type: 'text' })
    endereco: string;

    @Column()
    servicosNec: string;

    @Column()
    numeroVoluntariosNec: number;

}
