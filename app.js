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
    res.render('projects', {})
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') +
        '; press Ctrl-C to terminate.');
});
