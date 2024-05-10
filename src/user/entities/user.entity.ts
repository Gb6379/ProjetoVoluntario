import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Exclude } from "class-transformer";
import { Endereco } from "src/enderecos/entities/endereco.entity";
import { Role } from "src/role/role.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ unique: true })
    registration: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    cpf: string;

    @Column()
    phone: string;
    
    @Exclude()
    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    inactivatedAt: Date;

    @Column()
    funcao: string;


    /*@ManyToOne(() => Role, (role) => role.users, { nullable: false })
    role: Role;*/

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @OneToMany((type) => Endereco, (enderecos) => enderecos.user)
    enderecos: Endereco[];

    constructor(id?: number) {
      super();

      if(id) {
        this.id = id;
      }
    }
  
    @BeforeInsert()
    async transformFields() {
      this.registration = this.registration.trim();
      this.name = this.name.trim();
      this.email = this.email.trim();

      if(this.password) {
        this.password = await bcrypt.hash(this.password, 10);
      }
    }

    @BeforeInsert()
    setCreatedAt() {
      this.createdAt = new Date();
    }
}
