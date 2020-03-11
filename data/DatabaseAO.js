const DbContext = require("./DbContext");
var bcrypt = require('bcryptjs');

let _context = new DbContext();

class DatabaseAO {
    //user functions
    //====================================================================
    login(email, password) {
        //implement
    }
    register(user, password, callback) {
        _context.Users.find({email: user.email}, function(err, docs) {
            if(Object.keys(docs).length == 0) {
                //hash the password
                user.passwordHash = bcrypt.hashSync(password, 8);
                
                //insert the user
                _context.Users.insert(user, function(err, docs) {
                    if(err) {
                        console.log("broke");
                    }
                    callback(docs);
                });
            }
        });
    }
    getUserByEmail(email, callback) {
        _context.Users.findOne({email: email}, function(err, docs) {
            callback(docs);
        });
    }

    //project functions
    //====================================================================
    getProject(id) {
        //implement
    }
    getUserProjects(userId) {
        //implement
    }
    createProject(project) {
        //implement
    }
    updateProject(project) {
        //implement
    }
    deleteProject(id) {
        //implement
    }
    changeProjectPosition(project) {
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