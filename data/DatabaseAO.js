const _context = new DbContext();

class DatabaseAO {
    //user functions
    //====================================================================
    createHashPassword(passwordObject) {
        //implement
    }
    login(email, password) {
        //implement
    }
    register(user, password) {
        //implement
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