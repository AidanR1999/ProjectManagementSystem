const DbContext = require("./DbContext");
var bcrypt = require('bcryptjs');
var User = require('../models/User');

let _context = new DbContext();

class DatabaseAO {
    //user functions
    //====================================================================
    login(email, password) {
        return new Promise((resolve, reject) => {
            //get the user
            this.getUserByEmail(email, (user) => {
                if(user.verifyPasswordHash(password)) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        })
    }
    
    register(user, password) {
        return new Promise((resolve, reject) => {
            _context.Users.find({email: user.email}, (err, docs) => {
                if(Object.keys(docs).length == 0) {
                    //hash the password
                    user.passwordHash = bcrypt.hashSync(password, 8);
                    
                    //insert the user
                    _context.Users.insert(user, (err, nUser) => {
                        if(err) {
                            reject(err);
                            console.log("could not insert user")
                        }
                        resolve(nUser);
                    });
                } else {
                    reject(err);
                    console.log("could not load users")
                }
            });
        });
        
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            //find the user
            _context.Users.findOne({_id: id}, (err, doc) => {
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
            _context.Users.findOne({email: email}, (err, doc) => {
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
            _context.Users.update({ _id: user._id }, //where to change
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
            _context.Users.update({ _id: id }, //where to change
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
            _context.Projects.findOne({_id: id}, (err, doc) => {
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
            _context.Projects.find({ownerId: userId}, (err, projects) => {
                if(err) {
                    reject(err);
                    console.log("could not find projects");
                } else {
                    resolve(projects);
                }
            });
        });
    }
    createProject(project) {
        _context.Projects.insert(project)
    }
    updateProject(project, callback) {
        //implement
    }
    deleteProject(id) {
        _context.Projects.remove({_id: id}, {});
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