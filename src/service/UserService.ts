import { getConnection, Repository } from 'typeorm';
import { validate } from 'class-validator';

import Password from '../util/Password';
import _User from "../entity/_User";
import LoginDTO from '../DTO/LoginDTO';

export default class UserService {
    public async register(user: _User) : Promise<_User> {
        try {
            let userRepository = await getConnection().getRepository(_User);
            const foundUser = await userRepository.findOne({ email: user.email});
            
            if(foundUser) {
                throw new Error("User Exists");
            }

            return await userRepository.persist(user);
        } catch(e) {
            throw new Error(e);
        }
    }

    public async login(loginDTO : LoginDTO) : Promise<_User> {
        try {
            let userRepository = await getConnection().getRepository(_User);
            const foundUser = await userRepository.findOne({email: loginDTO.email});
            console.log("foundUser", foundUser);
            
            if(!foundUser) {
                throw new Error("Incorrect credentials");
            } else {
                const password : Password = new Password();
                if(password.comparePassword(loginDTO.password, foundUser.password)) {
                    return foundUser;
                } else {
                    throw new Error("Incorrect credentials");
                }
            }
        } catch(e) {
            throw new Error(e);
        }
        

    }
}