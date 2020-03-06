const DbContext = require("./DbContext");
let _context = new DbContext();

//create user
lukasz = {
  firstName: "Lukasz",
  lastName: "Bonkowski",
  email: "test1@test.com",
  password: "icecream2",

};


class Seed {
  constructor() {}

  async initUser() {
    //add user
    await _context.Users.insert(lukasz, function(err, docs) {});
  }

  // async initProjects() {
  //   //var user = await _context.Users.findOne({ email: "test1@test.com" }, function(err, doc) {});
  //   //console.log(user);
    
      
  //   });
  //   //doc.Promise();
  // }
}
module.exports = Seed;
