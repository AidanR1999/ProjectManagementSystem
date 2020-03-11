const Datastore = require("nedb");

class DbContext {
  Users = {};
  Projects = {};
  Milestones = {};
  Categories = {};

  constructor() {
    this.Users = new Datastore("./bin/users.db");
    this.Projects = new Datastore("./bin/projects.db");
    this.Milestones = new Datastore("./bin/milestones.db");
    this.Categories = new Datastore("./bin/categories.db");

    this.Users.loadDatabase();
    this.Projects.loadDatabase();
    this.Milestones.loadDatabase();
    this.Categories.loadDatabase();
  }
}
module.exports = DbContext;
