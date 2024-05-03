import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Exclude } from "class-transformer";

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

    @Column()
    cpf: number;

    @Column()
    cep: string;

    @Column()
    endereco:string;

    @Column()
    phone: number;
    
    @Exclude()
    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    inactivatedAt: Date;


    //@ManyToOne(() => Role, (role) => role.users, { nullable: false })
    //role: Role;


    //@OneToMany((type) => Product, (products) => products.user)
    //products: Product[];

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
