//require
//====================================================================
var express = require('express');
var mustache = require("mustache-express");
var path = require("path");

//express
//====================================================================
var app = express();

//configure
//====================================================================
app.set('port', process.env.PORT || 3000);
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.resolve(__dirname, "views"));

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
        "Id" : id
    });
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') +
        '; press Ctrl-C to terminate.');
});
