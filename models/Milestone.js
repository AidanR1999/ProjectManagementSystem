class Milestone {
    constructor() {
        this.id = "";
        this.name = "";
        this.completionDate = new Date();
        this.position = 0;
        this.projectId = "";
        this.categoryId = "";
    }

    constructor(name, completionDate, position, projectId, categoryId) {
        this.id = "";
        this.name = name;
        this.completionDate = completionDate;
        this.position = position;
        this.projectId = projectId;
        this.categoryId = categoryId;
    }

    constructor(id, name, completionDate, position, projectId, categoryId) {
        this.id = id;
        this.name = name;
        this.completionDate = completionDate;
        this.position = position;
        this.projectId = projectId;
        this.categoryId = categoryId;
    }

    //custom functions
    isComplete() {
        if(this.completionDate == new Date())
            return false;
        return true;
    }
}
module.exports = Milstone;