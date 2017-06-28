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
const typeorm_1 = require("typeorm");
const jwt = require('jsonwebtoken');
const config_1 = require("../config/config");
const Password_1 = require("../util/Password");
const _User_1 = require("../entity/_User");
const LoginResponseDTO_1 = require("../DTO/LoginResponseDTO");
class UserService {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userRepository = yield typeorm_1.getConnection().getRepository(_User_1.default);
                const foundUser = yield userRepository.findOne({ email: user.email });
                if (foundUser) {
                    throw new Error("User Exists");
                }
                return yield userRepository.persist(user);
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    login(loginRequestDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userRepository = yield typeorm_1.getConnection().getRepository(_User_1.default);
                const foundUser = yield userRepository.findOne({ email: loginRequestDTO.email });
                console.log("foundUser", foundUser);
                if (!foundUser) {
                    throw new Error("Incorrect credentials");
                }
                else {
                    const password = new Password_1.default();
                    if (password.comparePassword(loginRequestDTO.password, foundUser.password)) {
                        let response = new LoginResponseDTO_1.default();
                        response.accessToken = jwt.sign({
                            userId: foundUser.id,
                            role: foundUser.role
                        }, config_1.default.secret, {
                            expiresIn: "24h" // expires in 24 hours
                        });
                        return response;
                    }
                    else {
                        throw new Error("Incorrect credentials");
                    }
                }
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
}
exports.default = UserService;
