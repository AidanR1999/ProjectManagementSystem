class Milestone {
    constructor() {
        this.name = "";
        this.completionDate = new Date();
        this.position = 0;
        this.projectId = "";
    }

    //custom functions
    isComplete() {
        if(this.completionDate == new Date())
            return false;
        return true;
    }
}
module.exports = Milestone;