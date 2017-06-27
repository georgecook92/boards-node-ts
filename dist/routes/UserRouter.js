"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const class_validator_1 = require("class-validator");
const Password_1 = require("../util/Password");
const UserService_1 = require("../service/UserService");
const _User_1 = require("../entity/_User");
const LoginRequestDTO_1 = require("../DTO/LoginRequestDTO");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
        this.password = new Password_1.default();
    }
    /**
     *
     * @param req
     * @param res
     * @param next
     * Register route
     */
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new _User_1.default();
            user.email = req.body.email;
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.password = this.password.hashPassword(req.body.password + "");
            const errors = yield class_validator_1.validate(user);
            if (errors.length > 0) {
                res.status(400).json({ "error": "validation-error", "detail": errors });
            }
            else {
                this.userService = new UserService_1.default();
                let userResponse;
                try {
                    userResponse = yield this.userService.register(user);
                    res.status(200).json(userResponse);
                }
                catch (e) {
                    res.status(400).json({ message: e.toString() });
                }
            }
        });
    }
    /**
     *
     * @param req
     * @param res
     * @param next
     * login route
     */
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let loginRequestDTO = new LoginRequestDTO_1.default();
            loginRequestDTO.email = req.body.email;
            loginRequestDTO.password = req.body.password;
            const errors = yield class_validator_1.validate(loginRequestDTO);
            if (errors.length > 0) {
                res.status(400).json({ "error": "validation-error", "detail": errors });
            }
            else {
                this.userService = new UserService_1.default();
                let userResponse;
                try {
                    userResponse = yield this.userService.login(loginRequestDTO);
                    res.status(200).json(userResponse);
                }
                catch (e) {
                    res.status(400).json({ message: e.toString() });
                }
            }
        });
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
exports.UserRouter = UserRouter;
const userRoutes = new UserRouter();
userRoutes.init();
exports.default = userRoutes.router;
