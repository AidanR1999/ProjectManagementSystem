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
        res.redirect('/project/index')
        return;
    }
    //else render home
    res.render('home', {})
});

//login
router.post('/login', function(req, res) {
    _dbo.login(req.body.email, req.body.password, function(user) {
        if(user) {
            var token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
            res.cookie('auth', token);
            res.redirect('/project/index');
            return;
        }
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
        var token = jwt.sign(user, config.secret, {expiresIn: 86400});
        res.cookie('auth', token);
        res.redirect('/project/index');
    });
});

router.get('/logout', function(req, res) {
    res.cookie('auth', "");
    res.redirect('/');
})

module.exports = router;