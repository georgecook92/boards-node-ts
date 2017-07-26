import { Router, Request, Response, NextFunction } from 'express';
import ProtectedRoute from '../middleware/jwt-middleware';

import UserService from '../service/UserService'
import _User from "../entity/_User";

export class UserRouter {
    router: Router;
    userService: UserService;

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next
     * getUser route 
     */
    public async getUser(req: Request, res: Response, next: NextFunction) : Promise<void> {
        const decodedObject = req.decoded;
        this.userService = new UserService();
        const user: _User = await this.userService.getUser(req.decoded.userId); 
        res.status(200).json(user);
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.use(ProtectedRoute);
        this.router.get('/getUser/', this.getUser.bind(this));
    }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;