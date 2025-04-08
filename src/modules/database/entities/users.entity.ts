import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserDataEntity } from "./userData.entity";

@Entity('users')
export class UsersEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : 'varchar'})
    email : string;

    @Column({type: 'varchar'})
    password : string;

    @OneToMany(() => UserDataEntity, (userData) => userData.user)
    userData : UserDataEntity[]

    @CreateDateColumn()
    createdAt : Date;
}