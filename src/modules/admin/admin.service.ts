import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateComponentsSettingDTO } from "./dto/updateComponentsSetting.dto";
import { In, Repository } from "typeorm";
import { PageComponentsEntity } from "../database/entities/pageComponents.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(PageComponentsEntity)
        private pageComponentRepo : Repository<PageComponentsEntity>
    ){}

    async updateComponentsSetting(data : UpdateComponentsSettingDTO) {
        try {

            const pageIds = data.pages.map(page => page.pageId);

            await this.pageComponentRepo.delete({page: In(pageIds)});

            const newEntries = data.pages.flatMap(page =>

                page.componentIds.map(componentId => 

                    this.pageComponentRepo.create({
                        page : {
                            id : page.pageId
                        },
                        component : {
                            id : componentId
                        }
                    })
                )
            );

            await this.pageComponentRepo.save(newEntries);

            return {message : 'Setting updated'}
            
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}