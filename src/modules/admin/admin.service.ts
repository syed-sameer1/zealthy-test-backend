import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateComponentsSettingDTO } from "./dto/updateComponentsSetting.dto";
import { In, Repository } from "typeorm";
import { PageComponentsEntity } from "../database/entities/pageComponents.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "../database/entities/users.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(PageComponentsEntity)
        private pageComponentRepo : Repository<PageComponentsEntity>,
        @InjectRepository(UsersEntity)
        private userRepo: Repository<UsersEntity>
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

    async getUserData () {
        try {

            const user = await this.userRepo.find({
                order: {
                    id : 'desc'
                },
                relations: {
                    userData: {
                        component : true
                    }
                }
            });

            if(user) {
                const {password, ...safeUser} = user[0]

                return safeUser
            }

            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
            
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}