import { Schema } from "mongoose";
import Password from '../util/Password';
const passwordLib = new Password();

export var userSchema: Schema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  role: String
}, {timestamps: true});

userSchema.pre("save", function(next) {
    this.password = passwordLib.hashPassword(this.password);
    next();
});

userSchema.methods.comparePassword = (password: string, hash: string) => {
    return passwordLib.comparePassword(password, hash);
}

