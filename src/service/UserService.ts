import { getConnection, Repository } from 'typeorm';
import { validate } from 'class-validator';
const jwt = require('jsonwebtoken');

import Config from "../config/config";
import Password from '../util/Password';
import _User from "../entity/_User";
import LoginRequestDTO from '../DTO/LoginRequestDTO';
import LoginResponseDTO from '../DTO/LoginResponseDTO';

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

    public async login(loginRequestDTO : LoginRequestDTO) : Promise<LoginResponseDTO> {
        try {
            let userRepository = await getConnection().getRepository(_User);
            const foundUser = await userRepository.findOne({email: loginRequestDTO.email});
            console.log("foundUser", foundUser);
            
            if(!foundUser) {
                throw new Error("Incorrect credentials");
            } else {
                const password : Password = new Password();
                if(password.comparePassword(loginRequestDTO.password, foundUser.password)) {
                    let response: LoginResponseDTO = new LoginResponseDTO();
                    response.accessToken = jwt.sign({
                        userId: foundUser.id
                    }, Config.secret, {
                        expiresIn: "24h" // expires in 24 hours
                    });
                    return response;
                } else {
                    throw new Error("Incorrect credentials");
                }
            }
        } catch(e) {
            throw new Error(e);
        }
        

    }
}