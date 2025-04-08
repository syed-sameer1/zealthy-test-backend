import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComponentsEntity } from "src/modules/database/entities/components.entity";
import { PageComponentsEntity } from "src/modules/database/entities/pageComponents.entity";
import { PagesEntity } from "src/modules/database/entities/pages.entity";
import { UsersEntity } from "src/modules/database/entities/users.entity";
import { UserDataEntity } from "./entities/userData.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsersEntity,
            ComponentsEntity,
            PagesEntity,
            PageComponentsEntity,
            UserDataEntity
        ])
    ],
    exports : [TypeOrmModule]
})
export class DatabaseModule {}