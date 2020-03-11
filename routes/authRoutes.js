var express = require('express');
var jwt = require('jsonwebtoken');
var User = require("../models/User");
var Database = require("../data/DatabaseAO");


var router = express.Router();
var _dbo = new Database();

//home page
router.get('/', function (req, res) {
    res.render('home', {})
});

//login
router.post('/login', function(req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
});

//register
router.post('/register', function(req, res) {
    //create user object
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    //register user
    _dbo.register(user, req.body.password);

    res.redirect('/project/index');
});

module.exports = router;