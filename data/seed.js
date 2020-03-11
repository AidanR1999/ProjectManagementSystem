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
  }

  async initProjects() {
    await _context.Users.findOne({email: "test1@test.com"}, async function(err, user){
      var project = {
        "title": "Web Application",
        "Module": "Web platform",
        "dueDate" : "20/11/2020",
        "ownerId": user._id
      };

      //console.log(doc);

      await _context.Projects.insert(project, async function(err, proj) {
        
        var category1 = {
          _id : 1,
          name : 'In progress',
          position : 0,
          projectId : proj._id
        }
        await _context.Categories.insert(category1, async function(err, cat){
          var milestone1 = {
            name : 'Design stage complete',
            _id : 1,
            completionDate: '10/03/2020',
            position : 0,
            projectId : proj._id,
            categoryId : cat._id
          }
        await _context.Milestones.insert(milestone1, function(err, mile){});
        });
        //await _context.Projects.findOne({_id : newDoc._id}){
          
        
      });
    })
  }
}
module.exports = Seed;
