//require
//====================================================================
var express = require('express');
var mustache = require("mustache-express");
var path = require("path");
var Seed = require("./data/seed");

//express
//====================================================================
var app = express();

//configure
//====================================================================
app.set('port', process.env.PORT || 3000);
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.resolve(__dirname, "views"));

//seed database
//====================================================================
let seed = new Seed();
//seed.initUser();
seed.initProjects();

//routes
//====================================================================
app.get('/', function (req, res) {
    res.render('home', {})
});

app.get('/projects/', function (req, res) {
    res.render('projects', {
        "projects": [
            {
                "Id" : 1,
                "Title" : "Web Platform Application",
                "Module" : "Web Platform Development",
                "DueDate": "02/11/2020",
                "CompletionDate" : null
            },
            {
                "Id" : 2,
                "Title": "IP3 Wireframes",
                "Module": "Integrated Project 3",
                "DueDate": "11/09/2020",
                "CompletionDate" : "05/03/2020"
            },
            {
                "Id" : 3,
                "Title": "RSIP Poster",
                "Module": "Research Skills and Professional Issues",
                "DueDate": "13/03/2020",
                "CompletionDate" : "04/03/2020"
            }
        ]
    });
});

app.get('/project/edit/:projectId', function (req, res) {
    var id = req.params.projectId;
    res.render('edit', {
            "categories": [
                {
                    "id": 1,
                    "name" : "Backlog"
                },
                {
                    "id": 2,
                    "name" : "To be complete",
                },
                {
                    "id": 3,
                    "name" : "Completed",
                }
            ],
            "rows": [
                {
                    "milestones":[
                        {
                            "mileName": "Create projects page",
                            "completionDate" : null,
                        },
                        {
                            "mileName": "Create home page",
                            "completionDate" : null,
                        },
                        {
                            "mileName": "Start adobe XD",
                            "completionDate" : "06/03/2020",
                        }
                    ]
                },
                {
                    "milestones":[
                        {
                            "mileName": "Create profile builder",
                            "completionDate" : null,
                        }
                    ]
                }
            ]
    });
});

app.get('/project/create', function (req, res) {
    res.render('create', {});
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
