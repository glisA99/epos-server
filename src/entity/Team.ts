import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { User } from "./User";

@Entity()
export class Team {

    constructor(naziv:string, users: Array<User>) {
        this.naziv = naziv;
        this.clanovi = users;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naziv:string;

    @ManyToMany(type => User, user => user.teams)
    @JoinTable()
    clanovi: Array<User>;
}
