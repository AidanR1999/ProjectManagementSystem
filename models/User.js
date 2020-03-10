class User {
    constructor() {
        this.id = "",
        this.firstName = "",
        this.lastName = "",
        this.email = "",
        this.passwordHash = [],
        this.passwordByte = []
    }

    constructor(id, firstName, lastName, email, passwordHash, passwordSalt) {
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.passwordHash = passwordHash,
        this.passwordSalt = passwordSalt
    }

    constructor(firstName, lastName, email, passwordHash, passwordSalt) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.passwordHash = passwordHash,
        this.passwordSalt = passwordSalt
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