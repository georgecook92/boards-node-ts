import { Router, Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';
import { validate } from 'class-validator';

import UserService from '../service/UserService';

import {_User} from "../entity/_User";

export class UserRouter {
    router: Router;
    userService: UserService;

    constructor() {
        this.router = Router();
        this.init();
    }

    public async save(req: Request, res: Response, next: NextFunction) {
        let user = new _User();
        user.email = req.body.email;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.password = req.body.password;

        let errors = await validate(user);
        if(errors.length > 0) {
            res.status(400).json({"error": "validation-error", "detail": errors});
        } else {
            this.userService = new UserService();
            let userResponse : _User;
            try {
                userResponse = await this.userService.saveUser(user);
                res.status(200).json(userResponse);
            } catch(e) {                    
                res.status(400).json({message: e.toString()});
            }
        }
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('/', this.save.bind(this));
    }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;