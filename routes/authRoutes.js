var express = require('express');
var jwt = require('jsonwebtoken');
var config = require("../config");
var User = require("../models/User");
var Database = require("../data/DatabaseAO");

var router = express.Router();
var _dbo = new Database();

//home page
router.get('/', function (req, res) {
    //check if user has token
    var token = req.cookies.auth;
    if(token) {
        res.redirect('/project/')
        return;
    }
    //else render home
    res.render('home', {})
});

//login
router.post('/login', function(req, res) {
    //attempt login
    _dbo.login(req.body.email, req.body.password, function(user) {
        //if successful send token
        if(user) {
            var token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
            res.cookie('auth', token);
            res.redirect('/project/');
            return;
        }
        //else redirect back
        res.redirect('/');
    });
});

//register
router.post('/register', function(req, res) {
    //create user object
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    //register user
    _dbo.register(user, req.body.password, function(user) {
        //send token
        var token = jwt.sign(user, config.secret, {expiresIn: 86400});
        res.cookie('auth', token);
        res.redirect('/project/');
    });
});

//logout
router.get('/logout', function(req, res) {
    //clear token
    res.cookie('auth', "");
    res.redirect('/');
})

module.exports = router;