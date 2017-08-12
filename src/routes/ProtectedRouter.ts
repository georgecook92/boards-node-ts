// import { Router, Request, Response, NextFunction } from 'express';
// import { getConnection } from 'typeorm';
// import { validate } from 'class-validator';
// import Password from '../util/Password';
// import ProtectedRoute from '../middleware/jwt-middleware';

// import AuthService from '../service/AuthService';

// import _User from "../entity/_User";
// import LoginRequestDTO from '../DTO/LoginRequestDTO';
// import LoginResponseDTO from "../DTO/LoginResponseDTO";

// export class ProtectedRouter {
//     router: Router;

//     constructor() {
//         this.router = Router();
//         this.init();
//     }

//     /**
//      * 
//      * @param req 
//      * @param res 
//      * @param next
//      * login route 
//      */
//     public async protected(req: Request, res: Response, next: NextFunction) : Promise<void> {
//         res.status(200).json({ message: "Hello" });
//     }
    
//     /**
//      * Take each handler, and attach to one of the Express.Router's
//      * endpoints.
//      */
//     init() {
//         this.router.use(ProtectedRoute);
//         this.router.get('/protectedRoute', this.protected.bind(this));
//     }
// }

// const protectedRoutes = new ProtectedRouter();
// protectedRoutes.init();

// export default protectedRoutes.router;