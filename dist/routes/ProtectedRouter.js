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
const jwt_middleware_1 = require("../middleware/jwt-middleware");
class ProtectedRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     *
     * @param req
     * @param res
     * @param next
     * login route
     */
    protected(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('PROTECTED ROUTE');
            res.status(200).json({ message: "Hello" });
        });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.use(jwt_middleware_1.default);
        this.router.get('/protectedRoute', this.protected.bind(this));
    }
}
exports.ProtectedRouter = ProtectedRouter;
const protectedRoutes = new ProtectedRouter();
protectedRoutes.init();
exports.default = protectedRoutes.router;
