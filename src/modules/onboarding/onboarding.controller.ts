import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { OnboardingService } from "./onboarding.service";
import { RegisterUserDTO } from "./dto/registerUser.dto";
import { UpdateUserDataDTO } from "./dto/updateUserData.dto";

@Controller('onboarding')
export class OnboardingController {
    constructor(
        private onboardService : OnboardingService
    ){}

    @Post('user')
    @UsePipes(ValidationPipe)
    async registerUser(
        @Body() data : RegisterUserDTO
    ) {

        return await this.onboardService.registerUser(data);

    }

    @Put('user/:userId')
    @UsePipes(ValidationPipe)
    async updateUserData(
        @Param('userId', new ParseIntPipe()) userId : number,
        @Body() data : UpdateUserDataDTO
    ){

        return await this.onboardService.updateUserData(userId, data);

    }

    @Get('pages')
    async getOnboardingComponents(){

        return await this.onboardService.getOnboardingComponents();

    }
}