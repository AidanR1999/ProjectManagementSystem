const Datastore = require("nedb");

class DbContext {
  constructor() {
    this.Users = new Datastore("./bin/users.db");
    this.Projects = new Datastore("./bin/projects.db");
    this.Milestones = new Datastore("./bin/milestones.db");
    

    this.Users.loadDatabase();
    this.Projects.loadDatabase();
    this.Milestones.loadDatabase();
    
  }
}
module.exports = DbContext;
