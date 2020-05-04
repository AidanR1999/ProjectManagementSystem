const User = require('./models/User');
const Project = require('./models/Project');
const Milestone = require('./models/Milestone');
const _dbo = require('./data/DatabaseAO');
_dbo.init();

//dependencies
let userId = "";
let usr = {};
let passed = 0;
let failed = 0;

function pass(title) {
    passed++;
    console.log("Passed - " + title);
}

function fail(title) {
    failed++;
    console.log("Failed - " + title);
}

//call functions
testRegister();


//register testing
function testRegister() {
    let title = "testRegister()";

    //set details
    let user = new User();
    user.firstName = "Aidan";
    user.lastName = "Rooney";
    user.email = "unitTest@webplatform.com";
    let password = "testing123";

    //register user
    _dbo.register(user, password)
        .then((user) => {
            usr = user;
            userId = user._id;
            pass(title);
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            testGetUserByEmail();
        });
}

function testGetUserByEmail() {
    let title = "testGetUserByEmail()";

    //set details
    let email = "unitTest@webplatform.com";

    _dbo.getUserByEmail(email)
        .then((user) => {
            if(user.email == email) {
                pass(title);
            } else {
                fail(title);
            }
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            testGetUserById();
        });
}

function testGetUserById() {
    let title = "testGetUserById()";

    _dbo.getUserById(userId)
        .then((user) => {
            pass(title);
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            testLogin();
        });
}

function testLogin() {
    let title = "testLogin()";

    //set details
    let email = "unitTest@webplatform.com";
    let password = "testing123";

    _dbo.login(email, password)
        .then((user) => {
            pass(title);
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            testUpdateUserDetails();
        })
}

function testUpdateUserDetails() {
    let title = "testUpdateUserDetails()";

    //set details
    oldUser = usr;
    usr.firstName = "Pawel";
    usr.lastName = "Kmiec";

    _dbo.updateUserDetails(usr)
        .then((user) => {
            if(user.firstName == oldUser.firstName || user.lastName == oldUser.lastName) {
                fail(title);
            } else {
                pass(title);
            }
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            testChangePassword();
        });
}

function testChangePassword() {
    let title = "testChangePassword()";

    //set details
    let newPass = "Pass123@!";

    _dbo.changePassword(userId, newPass)
        .then((user) => {
            pass(title);
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            console.log("done");
        });
}
