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
        return bcrypt.compareSync(password, this.passwordHash);
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
module.exports = User;