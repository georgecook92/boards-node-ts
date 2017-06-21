import { getConnection, Repository } from 'typeorm';
import { validate } from 'class-validator';

import {_User} from "../entity/_User";

export default class UserService {
    public async saveUser(user: _User) : Promise<_User> {
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
}