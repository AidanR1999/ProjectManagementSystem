const Datastore = require("nedb");
var bcrypt = require('bcryptjs');
var User = require('../models/User');

class DatabaseAO {
    constructor() {
        this.Users = new Datastore("./bin/users.db");
        this.Projects = new Datastore("./bin/projects.db");
        this.Milestones = new Datastore("./bin/milestones.db");
        this.Categories = new Datastore("./bin/categories.db");
    }

    init() {
        this.Users.loadDatabase();
        this.Projects.loadDatabase();
        this.Milestones.loadDatabase();
        this.Categories.loadDatabase();
    }

    //user functions
    //====================================================================
    login(email, password) {
        return new Promise((resolve, reject) => {
            //get the user
            this.getUserByEmail(email)
                .then((user) => {
                    if(user.verifyPasswordHash(password)) {
                        resolve(user);
                    } else {
                        reject("passwords dont match");
                    }
                })
                .catch((err) => {
                    reject(err);
                    console.log("could not insert user")
                });
        })
    }

    register(user, password) {
        console.log("in register function")
        return new Promise((resolve, reject) => {
            console.log("hash password");
            //hash the password
            user.passwordHash = bcrypt.hashSync(password, 8);

            console.log(JSON.stringify(user));
            
            console.log("insert the user");
            //insert the user
            this.Users.insert(user, (err, nUser) => {
                if(err) {
                    reject(err);
                    console.log("could not insert user")
                }
                console.log("registered");
                resolve(nUser);
            });
        });
        
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            //find the user
            this.Users.findOne({_id: id}, (err, doc) => {
                if(err) {
                    reject(err);
                    console("could not find user");
                } else {
                    var user = new User();
                    user._id = doc._id;
                    user.firstName = doc.firstName;
                    user.lastName = doc.lastName;
                    user.email = doc.email;
                    user.passwordHash = doc.passwordHash;

                    resolve(user);
                }
            });
        });
        
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            //find the user
            this.Users.findOne({email: email}, (err, doc) => {
                if(err) {
                    reject(err);
                    console.log("user could not be found");
                } else {
                    var user = new User();
                    user._id = doc._id;
                    user.firstName = doc.firstName;
                    user.lastName = doc.lastName;
                    user.email = doc.email;
                    user.passwordHash = doc.passwordHash;   

                    resolve(user);
                }
            });
        })
    }

    updateUserDetails(user) {
        return new Promise((resolve, reject) => {
            //update user details in db
            this.Users.update({ _id: user._id }, //where to change
                    { $set: { firstName: user.firstName, lastName: user.lastName } }, //what to change
                    {}, //options
                    (err, user) => { //function
                        if(err) {
                            reject(err);
                            console.log("could not update user")
                        } else {
                            resolve(user);
                        }
                    });
        });
        
    }

    changePassword(id, password) {
        return new Promise((resolve, reject) => {
            //hash new password
            var passwordHash = bcrypt.hashSync(password, 8);

            //update in db
            this.Users.update({ _id: id }, //where to change
                                { $set: { passwordHash: passwordHash } }, //what to change
                                {}, //options
                                (err, user) => { //function
                                    if(err) {
                                        reject(err);
                                        console.log("could not update password");
                                    } else {
                                        resolve(user);
                                    }
                                });
        });
    }

    //project functions
    //====================================================================
    getProject(id) {
        return new Promise((resolve, reject) => {
            this.Projects.findOne({_id: id}, (err, doc) => {
                if(err) {
                    reject(err);
                    console.log("could not find project");
                } else {
                    resolve(doc);
                }
            });
        });
    }
    getUserProjects(userId) {
        return new Promise((resolve, reject) => {
            
        });
    }
    createProject(project) {
        this.Projects.insert(project)
    }
    updateProject(project, callback) {
        //implement
    }
    deleteProject(id) {
        this.Projects.remove({_id: id}, {});
    }
    changeProjectPosition(project, callback) {
        //implement
    }

    //milestone functions
    //====================================================================
    getMilestone(id) {
        //implement
    }
    getProjectMilestones(projectId) {
        //implement
    }
    createMilestone(milestone) {
        //implement
    }
    updateMilstone(milestone) {
        //implement
    }
    deleteMilstone(id) {
        //implement
    }
    changeMilestonePosition(milestone) {
        //implement
    }

    //category functions
    //====================================================================
    getCategory(id) {
        //implement
    }
    getProjectCategories(projectId) {
        //implement
    }
    createCategory(category) {
        //implement
    }
    updateCategory(category) {
        //implement
    }
    deleteCategory(id) {
        //implement
    }
    changeCategoryPosition(category) {
        //implement
    }
    
}

module.exports = DatabaseAO;