const User = require('./models/User');
const Project = require('./models/Project');
const Milestone = require('./models/Milestone');
const _dbo = require('./data/DatabaseAO');

//dependencies
let userId = "";
let usr = {};
let passed = 0;
let failed = 0;
let proj = {};
let mile = {};

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
            testCreateProject();
        });
}

function testCreateProject() {
    let title = "testCreateProject";

    //set details
    let project = new Project();
    project.title = "Project Management System";
    project.module = "Web Platform Development";
    project.dueDate = new Date("06/05/2020");
    project.position = 1;
    project.ownerId = userId;

    _dbo.createProject(project);
    testGetUserProjects();
}

function testGetUserProjects() {
    let title = "testGetUserProjects()";

    _dbo.getUserProjects(userId)
        .then((projects) => {
            proj = projects[0];
            pass(title);
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            testGetProject();
        });
}

function testGetProject() {
    let title = "testGetProject()";

    _dbo.getProject(proj._id)
        .then((project) => {
            pass(title);
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            testUpdateProject();
        });
}

function testUpdateProject() {
    let title = "testUpdateProject()";

    //set details
    let oldProject = proj;
    proj.title = "GradConnect";
    proj.module = "Integrated Project 3";

    _dbo.updateProject(proj)
        .then((project) => {
            if(project.title == oldProject.title || project.module == oldProject.module) {
                fail(title);
            } else {
                pass(title);
            }
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            testCreateMilestone();
        });
}

function testCreateMilestone() {
    let title = "testCreateMilestone()";
    
    //set details
    let milestone = new Milestone();
    milestone.name = "Test Functionality";
    milestone.projectId = proj._id;

    _dbo.createMilestone(milestone)
        .then((milestone) => {
            mile = milestone;
            pass(title);
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            testGetProjectMilestones();
        });
}

function testGetProjectMilestones() {
    let title = "testGetProjectMilestones()";

    _dbo.getProjectMilestones(proj._id)
        .then((milestones) => {
            if(milestones[0].name == mile.name) {
                pass(title);
            } else {
                fail(title);
            }
        }).catch(() => {
            fail(title);
        }).finally(() => {
            testGetMilestone();
        });
}

function testGetMilestone() {
    let title = "testGetMilestone()";

    _dbo.getMilestone(mile._id)
        .then((milestone) => {
            if(milestone.name == mile.name) {
                pass(title);
            } else {
                fail(title);
            }
        }).catch(() => {
            fail(title);
        }).finally(() => {
            testUpdateMilestone();
        });
}

function testUpdateMilestone() {
    let title = "testUpdateMilestone()";

    //set details
    let oldMilestone = mile;
    mile.name = "Group Report";

    _dbo.updateMilestone(mile)
        .then((milestone) => {
            if(milestone.name == oldMilestone) {
                fail(title);
            } else {
                pass(title);
            }
        }).catch((err) => {
            fail(title);
        }).finally(() => {
            removeData();
        });
}

function removeData() {
    _dbo.deleteProjectAndMilestones(proj._id);
    _dbo.deleteAccount(userId);
    end();
}

function end() {
    console.log(passed + " tests Passed.");
    console.log(failed + " tests Failed.");
}