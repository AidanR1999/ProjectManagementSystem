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

    //custom functions
    verifyPasswordHash(password) {

    }

    //getters and setters
    getId() {
        return this.id;
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }

    getEmail() {
        return this.email;
    }
    
    setFirstName(name) {
        this.firstName = name;
    }

    setLastName(name) {
        this.lastName = name;
    }
}
module.exports = User;