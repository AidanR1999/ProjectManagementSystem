var express = require('express');
var Database = require("../data/DatabaseAO");
var Project = require('../models/Project');
var jwt = require('jsonwebtoken');
var config = require("../config");

var _dbo = new Database();
_dbo.init();
var router = express.Router();

router.get('/', function (req, res) {
    console.log("redirected")
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, (err, data) => {
        if(err) {
            console.log("could not verify");
        } else {
            console.log("verified");
            console.log(data.id);
            _dbo.getUserProjects(data.id)
                .then((projects) => {
                    console.log("got projects");
                    res.render('projects', {
                            "projects": projects}
                        );
                })
                .catch((err) => {
                    console.log("Error:");
                    console.log(JSON.stringify(err));
                });
        }
    });
});

router.get('/edit/:projectId', function (req, res) {
   var id = req.params.projectId;
//    var token = req.cookies.auth;
//     jwt.verify(token, config.secret, (err, data) => {
//         if(err) {
//             console.log("could not verify");
//         } else {
            
//             _dbo.getProject(id)
//             .then((project) => {
//                 res.render('edit', {
//                     "milestones" : []
//                 });
//             });
//         };
//     });
});

router.get('/create', function (req, res) {
   res.render('create', {});
});

router.post('/create', function(req, res) {
    //get logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(err, data) {
        //create project
        var project = new Project();
        project.title = req.body.title;
        project.module = req.body.module;
        project.dueDate = new Date(req.body.dueDate);
        project.ownerId = data.id

        //add project to db
        _dbo.createProject(project, function(newProject) {
            res.redirect('/project/');
        });
    });
});

router.post('/delete', function(req, res) {
    _dbo.deleteProject(req.body.id, function(newProject) {
        res.redirect('/project/');
    });
});

module.exports = router;