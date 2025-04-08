import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PageComponentsEntity } from "./pageComponents.entity";
import { UserDataEntity } from "./userData.entity";

@Entity('components')
export class ComponentsEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : 'varchar'})
    name : string;

    @OneToMany(() => PageComponentsEntity, (pageComponent) => pageComponent.component)
    pageComponent : PageComponentsEntity[];

    @OneToMany(() => UserDataEntity, (userData) => userData.component)
    userData : UserDataEntity[];
}