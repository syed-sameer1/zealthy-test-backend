import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PageComponentsEntity } from "./pageComponents.entity";

@Entity('pages')
export class PagesEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type: 'int', unique : true})
    pageNumber: number

    @OneToMany(() => PageComponentsEntity, (component) => component.page)
    components : PageComponentsEntity[]
}