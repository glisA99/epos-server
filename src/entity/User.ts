import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { Team } from "./Team";

@Entity()
export class User {

    constructor(firstName:string,lastName:string, email: string,password: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({
        select: false, transformer: new EncryptionTransformer({
            key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: 'ff5ac19190424b1d88f9419ef949ae56'
        })
    })
    password: string;

    @ManyToMany(type => Team, team => team.clanovi,{eager:true})
    teams: Array<Team>;
}
