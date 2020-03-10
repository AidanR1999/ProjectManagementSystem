class Project {
    constructor() {
        this.id = "";
        this.title = "";
        this.module = "";
        this.dueDate = new Date();
        this.position = 0;
        this.completionDate = new Date();
        this.ownerId = "";
    }

    constructor(title, module, dueDate, position, completionDate, ownerId) {
        this.id = "";
        this.title = title;
        this.module = module;
        this.dueDate = dueDate;
        this.position = position;
        this.completionDate = completionDate;
        this.ownerId = ownerId;
    }

    constructor(id, title, module, dueDate, position, completionDate, ownerId) {
        this.id = id;
        this.title = title;
        this.module = module;
        this.dueDate = dueDate;
        this.position = position;
        this.completionDate = completionDate;
        this.ownerId = ownerId;
    }

    //custom functions
    isComplete() {
        if(this.completionDate == new Date())
            return false;
        return true;
    }
}
module.exports = Project;