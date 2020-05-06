var express = require('express');
var _dbo = require("../data/DatabaseAO");
var Project = require('../models/Project');
var Milestone = require('../models/Milestone');
var jwt = require('jsonwebtoken');
var config = require("../config");

var router = express.Router();

router.get('/', function (req, res) {
    var token = req.cookies.auth;

    jwt.verify(token, config.secret, (err, data) => {
        if(err) {
            console.log("could not verify");
            res.redirect('http://localhost:3000/')
        } else {
            console.log("verified");
            _dbo.getUserProjectsInComplete(data._id)
                .then((incompleteProjects) => {
                    _dbo.getUserProjectsComplete(data._id)
                    .then((completeProjects) => {
                            console.log("got projects");
                            res.render('projects', {
                            "incompleteProjects": incompleteProjects,
                            "completeProjects" : completeProjects}
                        );
                    })
                    
                })
                .catch((err) => {
                    console.log("Error:");
                    console.log(JSON.stringify(err));
                    res.redirect('/views/error.html');
                });
                
        }
    });
});

// edit project GET
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

// complete project
router.post('/complete/:projectId/', function(req, res){
    let id = req.params.projectId;
    let token = req.cookies.auth;
    jwt.verify(token, config.secret, function (err, data){
        _dbo.getProject(id)
            .then((project) =>
            {
                project.isComplete = true;
                var today = new Date();
                var dd = today.getDate();

                var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();
                
                if(dd<10) 
                {
                    dd='0'+dd;
                } 

                if(mm<10) 
                {
                    mm='0'+mm;
                } 
                today = yyyy+'-'+mm+'-'+dd;
                project.completionDate = today;
                _dbo.updateProject(project);
                res.redirect('/project/');
            });

    });

});

// edit project POST
router.post('/edit/:projectId/', function(req, res){
    let id = req.params.projectId;
    let token = req.cookies.auth;
    jwt.verify(token, config.secret, function (err, data){
        
        if(req.body.title != "" && req.body.module != "")
        {
            _dbo.getProject(id)
            .then((project) =>
            {
                project.title = req.body.title;
                project.module = req.body.module;
                project.dueDate = req.body.dueDate;
                _dbo.updateProject(project);
                res.redirect(id);
            });
            
        }
        
        
    });
    
});

// Add milestone POST
router.post('/edit/:projectId/addmilestone', function(req, res){
    let id = req.params.projectId;
    let token = req.cookies.auth;
    jwt.verify(token, config.secret, function (err, data){
        if(req.body.name != "")
        {
            let milestone = new Milestone();
            milestone.name = req.body.name;
            milestone.projectId = id;
            _dbo.createMilestone(milestone)
            .then((milestone) =>{
                console.log("added new milestone");
                res.redirect('/project/edit/'+id);
            })
        }
        
    });
    
});

// delete milestone POST
router.post('/edit/:projectId/deleteMilestone/:milestoneId', function(req, res){
    let id = req.params.projectId;
    let milId = req.params.milestoneId;
    let token = req.cookies.auth;
    jwt.verify(token, config.secret, function (err, data){
        _dbo.deleteMilestone(milId);
        res.redirect('/project/edit/'+id);
    });
    
});

// TBC
router.post('/edit/:projectId/editMilestone/:milestoneId', function(req, res){
    let id = req.params.projectId;
    let milId = req.params.milestoneId;
    let token = req.cookies.auth;
    jwt.verify(token, config.secret, function (err, data){
        _dbo.getMilestone(milId)
        .then((milestone) => {
            milestone.isComplete = true;
            var today = new Date();
            var dd = today.getDate();

            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            
            if(dd<10) 
            {
                dd='0'+dd;
            } 

            if(mm<10) 
            {
                mm='0'+mm;
            } 
            today = yyyy+'-'+mm+'-'+dd;
            milestone.completionDate = today;
            _dbo.updateMilestone(milestone)
            res.redirect('/project/edit/'+id);
        });
    });
    
})


// create
router.get('/create', function (req, res) {
    res.render('create', {});
});


// creatre project POST
router.post('/create', function(req, res) {
    //get logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(err, data) {
        //create project
        var project = new Project();
        project.title = req.body.title;
        project.isComplete = false;
        project.module = req.body.module;
        project.dueDate = req.body.dueDate;
        project.ownerId = data._id;
        //add project to db
        _dbo.createProject(project, function(newProject) {
            console.log("project created");
        });

    });
    res.redirect('/project/');

});

// delete project POST
router.post('/delete/:projectId', function(req, res) {
    let id = req.body.id;
    let token = req.cookies.auth;
    jwt.verify(token, config.secret, function (err, data){
        _dbo.deleteProjectAndMilestones(id)
        res.redirect('/project/');
        
    });
    
});

// view project GET
router.get('/view/:projectId', function(req, res) {
    //get url
    var url = req.originalUrl;

    //if url ends with /, remove /
    if(url.endsWith('/')) {
        url = url.substring(0, url.length - 1);
    }

    //get id from url
    let id = url.substring(url.lastIndexOf('/') + 1);

    //display project information
    _dbo.getProject(id)
        .then((project) => {
            _dbo.getProjectMilestones(id)
                .then((milestones) => {
                    res.render('view', {
                        "project" : project,
                        "milestones" : milestones
                    });
                });
            });
});

module.exports = router;