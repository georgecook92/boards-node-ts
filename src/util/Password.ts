const Bcrypt =  require('bcryptjs');

export default class Password {
    salt: string;

    constructor() {
        this.salt = Bcrypt.genSaltSync(10);
    }

    public hashPassword(password) : string {
        return Bcrypt.hashSync(password, this.salt);
    }

    public comparePassword(password, hash) {
        return Bcrypt.compareSync(password, hash);
    }

}