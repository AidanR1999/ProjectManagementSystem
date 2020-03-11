class Project {
    constructor() {
        this.title = "";
        this.module = "";
        this.dueDate = new Date();
        this.position = 0;
        this.completionDate = new Date();
        this.ownerId = "";
    }
    //custom functions
    isComplete() {
        if(this.completionDate == new Date())
            return false;
        return true;
    }
}
module.exports = Project;