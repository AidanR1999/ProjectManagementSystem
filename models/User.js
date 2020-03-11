var bcrypt = require('bcryptjs');

class User {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.passwordHash = "";
    }

    //custom functions
    verifyPasswordHash(password) {
        //hash new password
        password = bcrypt.hashSync(password, 8);

        //compare passwords
        if(password === this.passwordHash)
            return true;
        return false;
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
module.exports = User;