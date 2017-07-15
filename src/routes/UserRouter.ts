import { Router, Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';
import { validate } from 'class-validator';

import Password from '../util/Password';
import {createValidationErrorArray} from '../util/ErrorProcessing';

import UserService from '../service/UserService';

import _User from "../entity/_User";
import LoginRequestDTO from '../DTO/LoginRequestDTO';
import LoginResponseDTO from "../DTO/LoginResponseDTO";
import ErrorDTO from "../DTO/ErrorDTO";
import FieldErrorDTO from "../DTO/FieldErrorDTO";

export class UserRouter {
    router: Router;
    userService: UserService;
    password: Password;

    constructor() {
        this.router = Router();
        this.init();
        this.password = new Password();
    }

   

    /**
     * 
     * @param req 
     * @param res 
     * @param next
     * Register route
     */
    public async register(req: Request, res: Response, next: NextFunction) : Promise<void> {
        let user = new _User();
        user.email = req.body.email;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.password = req.body.password;
        const errors = await validate(user);

        if(errors.length > 0) {
            let errorDTO = new ErrorDTO();
            errorDTO.errorType = "validation-error";
            errorDTO.errors = createValidationErrorArray(errors);
            res.status(400).json(errorDTO);
        } else {
            this.userService = new UserService();
            let userResponse : _User;
            try {
                // hash password
                user.password = this.password.hashPassword(req.body.password + "");
                userResponse = await this.userService.register(user);
                res.status(200).json(userResponse);
            } catch(e) {                    
                res.status(400).json({message: e.toString()});
            }
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next
     * login route 
     */
    public async login(req: Request, res: Response, next: NextFunction) : Promise<void> {
        let loginRequestDTO = new LoginRequestDTO();
        loginRequestDTO.email = req.body.email;
        loginRequestDTO.password = req.body.password;

        const errors = await validate(loginRequestDTO);
        
        if(errors.length > 0) {
            let errorDTO = new ErrorDTO();
            errorDTO.errorType = "validation-error";
            errorDTO.errors = createValidationErrorArray(errors);
            res.status(400).json(errorDTO);
        } else {
            this.userService = new UserService();
            let userResponse : LoginResponseDTO;
            try {
                userResponse = await this.userService.login(loginRequestDTO);
                res.status(200).json(userResponse);
            } catch(e) {
                res.status(400).json({error: e.message});
            }
            
        }
    }
    
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('/register', this.register.bind(this));
        this.router.post('/login', this.login.bind(this));
    }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;