// import _User from "../entity/_User";
// import { getConnection, Repository } from 'typeorm';

// export default class UserService {
//     public async getUser(userId: Number) : Promise<_User> {
//         try {
//             let userRepository = await getConnection().getRepository(_User);
//             const foundUser = await userRepository.findOneById(userId);
            
//             if(foundUser) {
//                 return foundUser;
//             }
//             throw new Error("Something went wrong");
           
//         } catch(e) {
//             throw new Error(e);
//         }
//     }
// }