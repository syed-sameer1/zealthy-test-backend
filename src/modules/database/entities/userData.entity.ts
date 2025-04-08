import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";
import { ComponentsEntity } from "./components.entity";

@Entity('userData')
export class UserDataEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => UsersEntity, (user) => user.userData, {onDelete : 'CASCADE'})
    user : UsersEntity;

    @ManyToOne(() => ComponentsEntity, (component) => component.userData)
    component : ComponentsEntity;
    
    @Column({type : 'jsonb'})
    data : string

    @CreateDateColumn()
    createdAt : Date;
}