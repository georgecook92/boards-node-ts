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
const _User_1 = require("../entity/_User");
class UserService {
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userRepository = yield typeorm_1.getConnection().getRepository(_User_1._User);
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
}
exports.default = UserService;
