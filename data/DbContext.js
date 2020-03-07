const Datastore = require("nedb");

class DbContext {
  // Users = {};
  // Projects = {};
  // Milestones = {};
  // Categories = {};

  constructor() {
    this.Users = new Datastore("./data/users.db");
    this.Projects = new Datastore("./data/projects.db");
    this.Milestones = new Datastore("./data/milestones.db");
    this.Categories = new Datastore("./data/categories.db");

    this.Users.loadDatabase();
    this.Projects.loadDatabase();
    this.Milestones.loadDatabase();
    this.Categories.loadDatabase();
  }
}
module.exports = DbContext;
