import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegisterUserDTO } from "./dto/registerUser.dto";
import { Repository } from "typeorm";
import { UsersEntity } from "../database/entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { hashPassword } from "src/utils/bcrypt";
import { UpdateUserDataDTO } from "./dto/updateUserData.dto";
import { UserDataEntity } from "../database/entities/userData.entity";
import { PagesEntity } from "../database/entities/pages.entity";

@Injectable()
export class OnboardingService {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepo : Repository<UsersEntity>,
        @InjectRepository(UserDataEntity)
        private userDataRepo : Repository<UserDataEntity>,
        @InjectRepository(PagesEntity)
        private pagesRepo : Repository<PagesEntity>
    ){}

    async registerUser (data : RegisterUserDTO) {

        try {

            const isUserExist = await this.userRepo.findOne({
                where : {
                    email : data.email
                }
            });

            if(isUserExist) throw new HttpException('User Already Exist', HttpStatus.CONFLICT);

            const hashedPassword = hashPassword(data.password);

            const userInstance = this.userRepo.create({
                email : data.email,
                password : hashedPassword
            });

            const user = await this.userRepo.save(userInstance);

            const { password, ...safeUser } = user;

            return safeUser;
            
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUserData(userId: number, data : UpdateUserDataDTO){
        try {

            const user = await this.userRepo.findOne({
                where : {
                    id : userId
                }
            });

            if(!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

            for(const item of data.components){

                let dataExisting = await this.userDataRepo.findOne({
                    where : {
                        user : {
                            id : userId
                        },
                        component : {
                            id : item.componentId
                        }
                    }
                });

                if(dataExisting) {

                    dataExisting.data = item.data;

                }else{

                    dataExisting = this.userDataRepo.create({
                        user,
                        component : {
                            id : item.componentId
                        },
                        data : item.data
                    });

                }

                await this.userDataRepo.save(dataExisting);

            }

            return {message : 'User Profile Updated'}
            
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOnboardingComponents () {
        try {

            let pageComponents = await this.pagesRepo.find({
                relations : {
                    components : {
                        component : true
                    }
                }
            });

            return pageComponents;
            
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}