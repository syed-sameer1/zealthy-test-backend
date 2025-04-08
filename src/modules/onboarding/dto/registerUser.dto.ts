import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDTO {
    
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @IsString()
    password : string;
}