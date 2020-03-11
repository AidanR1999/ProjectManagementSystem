const DbContext = require("./DbContext");
let _context = new DbContext();

//create user
lukasz = {
  firstName: "Lukasz",
  lastName: "Bonkowski",
  email: "test1@test.com",
  password: "icecream2"
};


class Seed {
  constructor() {}

  async initUser() {
    await _context.Users.insert(lukasz, function(err, doc) {});
    //console.log(doc);
  }

  async initProjects() {
    await _context.Users.findOne({email: 'test1@test.com'}, async function(err, doc){
      var project = {
        "title": "Web Application",
        "Module": "Web platform",
        "dueDate" : "20/11/2020",
        "userId": doc._id
      };

      console.log(doc);

      await _context.Projects.insert(project, async function(err, newDoc) {
        console.log(newDoc);
      });
    })
  }
}
module.exports = Seed;
