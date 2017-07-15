import {IsNotEmpty, IsEmail} from "class-validator";

export default class LoginRequestDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}