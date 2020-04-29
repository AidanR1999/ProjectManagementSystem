var express = require('express');
var _dbo = require("../data/DatabaseAO");
var Project = require('../models/Project');
var Milestone = require('../models/Milestone');
var jwt = require('jsonwebtoken');
var config = require("../config");

var router = express.Router();

router.get('/', function (req, res) {
    console.log("redirected");
    var token = req.cookies.auth;
    console.log("in project root, token", token);

    console.log(token);
    jwt.verify(token, config.secret, (err, data) => {
        if(err) {
            console.log("could not verify");
            res.redirect('http://localhost:3000/')
        } else {
            console.log("verified");
            _dbo.getUserProjects(data.id)
                .then((projects) => {
                    console.log(projects);
                    console.log("got projects");
                    res.render('projects', {
                            "projects": projects}
                        );
                })
                .catch((err) => {
                    console.log("Error:");
                    console.log(JSON.stringify(err));
                    res.redirect('/views/error.html');
                });
        }
    });
});

router.get('/edit/:projectId/', function (req, res) {
   var id = req.params.projectId;
   var token = req.cookies.auth;
    jwt.verify(token, config.secret, (err, data) => {
        if(err) {
            console.log("could not verify");
        } else {
            
            _dbo.getProject(id)
            .then((project) => {
                _dbo.getProjectMilestones(id)
                .then((milestones) => {
                    res.render('edit', {
                        "project" : project,
                        "milestones" : milestones
                    });
                });
            });
        }
    });
});

router.post('/edit/:projectId/', function(req, res){
    let id = req.params.projectId;
    let token = req.cookies.auth;
    jwt.verify(token, config.secret, function (err, data){
        let milestone = new Milestone();
        milestone.name = req.body.name;
        milestone.projectId = id;
        _dbo.createMilestone(milestone)
            .then((milestone) =>{
                console.log("added new milestone");
                res.redirect(id);
            })
    });
    
});
router.post('/edit/:projectId/deleteMilestone/:milestoneId', function(req, res){
    let id = req.params.projectId;
    let milId = req.params.milestoneId;
    let token = req.cookies.auth;
    jwt.verify(token, config.secret, function (err, data){
        _dbo.deleteMilestone(milId);
        res.redirect('/project/edit/'+id);
    });
    
});

router.post('/edit/:projectId/editMilestone/:milestoneId', function(req, res){
    let id = req.params.projectId;
    let milId = req.params.milestoneId;
    let token = req.cookies.auth;
    jwt.verify(token, config.secret, function (err, data){
        _dbo.getMilestone(milId)
        .then((milestone) => {
            milestone.isComplete = true;
            milestone.completionDate = new Date();
            _dbo.updateMilestone(milestone)
            res.redirect('/project/edit/'+id);
        });
    });
    
})

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
        console.log(project.title)
        project.module = req.body.module;
        project.dueDate = new Date(req.body.dueDate);
        project.ownerId = data.id
        //add project to db
        _dbo.createProject(project, function(newProject) {
            console.log("project created");
            //res.redirect('/project/');
        });
        res.redirect('/project/');
    });
});

router.post('/delete', function(req, res) {
    _dbo.deleteProject(req.body.id, function(newProject) {
        res.redirect('/project/');
    });
});

module.exports = router;