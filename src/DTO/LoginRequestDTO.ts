import {IsNotEmpty} from "class-validator";

export default class LoginRequestDTO {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}