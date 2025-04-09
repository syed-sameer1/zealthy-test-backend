import { Body, Controller, Get, Put } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { UpdateComponentsSettingDTO } from "./dto/updateComponentsSetting.dto";

@Controller('admin')
export class AdminController {
    constructor(
        private adminService: AdminService
    ){}

    @Put('/component/setting')
    async updateComponentsSetting(
        @Body() data : UpdateComponentsSettingDTO
    ) {

        return await this.adminService.updateComponentsSetting(data);

    }

    @Get('user')
    async getUserData () {
        return await this.adminService.getUserData();
    }
}