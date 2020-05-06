const Datastore = require("nedb");
var bcrypt = require('bcryptjs');
var User = require('../models/User');


class DatabaseAO {
    constructor() {
        this.Users = new Datastore("./bin/users.db");
        this.Projects = new Datastore("./bin/projects.db");
        this.Milestones = new Datastore("./bin/milestones.db");
    }

    init() {
        this.Users.loadDatabase(function (err) {
        // Callback is optional
        // Now commands will be executed
        if (err) {
            console.log("Users finished", err);
        }
        });
        this.Projects.loadDatabase(function (err) {
            // Callback is optional
            // Now commands will be executed
            if (err) {
                console.log("Projects finished", err);
            }
        });
        this.Milestones.loadDatabase(function (err) {
            // Callback is optional
            // Now commands will be executed
            if (err) {
                console.log("Milestones finished", err);
            }
        });
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
                        reject(new Error());
                    }
                })
                .catch((err) => {
                    reject(new Error(err));
                    console.log("could not login")
                });
        })
    }

    register(user, password) {
        return new Promise((resolve, reject) => {
            //hash the password
            user.passwordHash = bcrypt.hashSync(password, 8);

            //insert the user
            this.Users.insert(user, (err, nUser) => {
                if(err) {
                    reject(err);
                }
                else
                {
                    resolve(nUser);
                }
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
                }
                else {

                    var user = new User();
                    user._id = id;
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
                    console.log("nedb error");
                } 
                
                if(doc == null) {
                    reject( new Error('no user found'));
                    console.log("This should return that user not found");
                }
                else {
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

    deleteAccount(id) {
        return new Promise((resolve, reject) => {
            this.Users.remove({_id: id},
                {},
                (err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve();
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
    //finds completed projects
    getUserProjectsComplete(userId) {
        return new Promise((resolve, reject) => {
            this.Projects.find( {ownerId: userId, isComplete : true}, (err, docs) => {
                if(err) {
                    reject(err);
                    console.log("could not find project");
                } else {
                    resolve(docs);
                }
            });
        });
    }

    //finds incomplete projects
    getUserProjectsInComplete(userId) {
        return new Promise((resolve, reject) => {
            this.Projects.find( {ownerId: userId, isComplete : false}, (err, docs) => {
                if(err) {
                    reject(err);
                    console.log("could not find project");
                } else {
                    resolve(docs);
                }
            });
        });
    }

    //finds all users projects ---- not used anymore
    getUserProjects(userId) {
        return new Promise((resolve, reject) => {
            this.Projects.find( {ownerId: userId}, (err, docs) => {
                if(err) {
                    reject(err);
                    console.log("could not find project");
                } else {
                    resolve(docs);
                }
            });
        });
    }
    
    
    //create project
    createProject(project) {
        this.Projects.insert(project)
    }

    updateProject(project) {
        return new Promise((resolve, reject) =>{
            this.Projects.update({_id: project._id},
                { $set: {title: project.title, dueDate: project.dueDate,
                    module : project.module, isComplete : project.isComplete, completionDate : project.completionDate  } },
                {},
                (err, project)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(project);
                    }
                });
        });
    }

    //deletes project and its milestones
    deleteProjectAndMilestones(id){
        this.Milestones.remove({projectId : id}, { multi: true })
        this.Projects.remove({_id: id}, {})
    }

    changeProjectPosition(project) {
        //implement
    }

    //milestone functions
    //====================================================================
    getMilestone(id) {
        return new Promise((resolve, reject) =>{
            this.Milestones.findOne({_id: id}, (err, doc) =>{
                if(err) {
                    reject(err);
                }
                else{
                    resolve(doc);
                }
            });
        });
    }

    //find milestones for the project
    getProjectMilestones(projectId) {
        return new Promise((resolve, reject) => {
            this.Milestones.find({projectId: projectId}, (err, docs) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(docs);
                }
            });
        });
    }

    //create milestone
    createMilestone(milestone) {
        return new Promise((resolve, reject) =>{
            this.Milestones.insert(milestone, (err, newMilestone) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(newMilestone);
                }
            });
        });
    }

    //update milestone
    updateMilestone(milestone) {
        return new Promise((resolve, reject) =>{
            this.Milestones.update({_id: milestone._id},
                { $set: {name: milestone.name, completionDate: milestone.completionDate, isComplete : milestone.isComplete } },
                {},
                (err, milestone)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(milestone);
                    }
                });
        });
    }

    //deletes milestone
    deleteMilestone(id) {
        this.Milestones.remove({_id: id},{});
    }

    

    changeMilestonePosition(milestone) {
        //implement
    }

}

module.exports = new DatabaseAO();