"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bcrypt = require('bcryptjs');
class Password {
    constructor() {
        this.salt = Bcrypt.genSaltSync(10);
    }
    hashPassword(password) {
        return Bcrypt.hashSync(password, this.salt);
    }
    comparePassword(password, hash) {
        return Bcrypt.compareSync(password, hash);
    }
}
exports.default = Password;
