import { Exclude } from "class-transformer";
import { Endereco } from "src/enderecos/entities/endereco.entity";
import { Role } from "src/role/role.entity";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
export class Institution extends BaseEntity { 

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ unique: true })
    name: string;

    @Column()
    tipo: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column({ nullable: true })
    password: string;

    @Column()
    phone: string;

    @Column()
    itensNecessarios: string;

    @Column()
    numeroVoluntariosNec: number;

    @Column()
    voluntarioStatus: string;

    @Column()
    doacoeStatus: string;

    @Column()
    servicosNecessarios: string;

    @OneToMany((type) => Endereco, (enderecos) => enderecos.institution)
    enderecos: Endereco[];

    @ManyToOne(() => Role, (role) => role.institution)
    role: Role;

    @BeforeInsert()
    async transformFields() {
      this.name = this.name.trim();
      this.email = this.email.trim();

      if(this.password) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    }

    constructor(id?: number) {
        super();
  
        if(id) {
          this.id = id;
        }
      }

      

   
}
