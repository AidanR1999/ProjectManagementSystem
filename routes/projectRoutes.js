var express = require('express');
var Database = require("../data/DatabaseAO");
var Project = require('../models/Project');
var jwt = require('jsonwebtoken');
var config = require("../config");

var _dbo = new Database();
var router = express.Router();

router.get('/index', function (req, res) {
    //get logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(err, data) {
        _dbo.getUserProjects(data.id, function(projects) {
            console.log(projects);
            res.render('projects', {
                "projects": projects}
                );
        })
    });
});

router.get('/edit/:projectId', function (req, res) {
   var id = req.params.projectId;
   res.render('edit', {});
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
            res.redirect('/project/index');
        });
    });

    
});

module.exports = router;