import {IsNotEmpty} from "class-validator";

export default class LoginDTO {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}