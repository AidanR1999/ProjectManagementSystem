const DbContext = require("./DbContext");
var bcrypt = require('bcryptjs');
var config = require("../config");

let _context = new DbContext();

class DatabaseAO {
    //user functions
    //====================================================================
    login(email, password) {
        //implement
    }
    register(user, password) {
        _context.Users.find({email: user.email}, function(err, docs) {
            if(Object.keys(docs).length == 0) {
                //hash the password
                user.passwordHash = bcrypt.hashSync(password, 8);
                
                //insert the user
                _context.Users.insert(user, function(err, docs) {
                    if(err) {
                        console.log("broke");
                    }
                });
            }
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