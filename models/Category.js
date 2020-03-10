class Category {
    constructor() {
        this.id = "";
        this.name = "";
        this.position = 0;
        this.projectId = "";
    }

    constructor(name, position, projectId) {
        this.id = "";
        this.name = name;
        this.position = position;
        this.projectId = projectId;
    }

    constructor(id, name, position, projectId) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.projectId = projectId;
    }
}