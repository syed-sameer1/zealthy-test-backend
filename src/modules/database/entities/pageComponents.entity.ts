import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PagesEntity } from "./pages.entity";
import { ComponentsEntity } from "./components.entity";

@Entity('pageComponents')
export class PageComponentsEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => PagesEntity, (page) => page.components, {onDelete : 'CASCADE'})
    page : PagesEntity;

    @ManyToOne(() => ComponentsEntity, (component) => component.pageComponent, {onDelete: 'CASCADE'})
    component : ComponentsEntity
}