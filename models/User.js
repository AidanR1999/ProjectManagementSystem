class User {
    constructor() {
        this.id = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.passwordHash = "";
    }

    //custom functions
    verifyPasswordHash(password) {
        //implement
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
module.exports = User;