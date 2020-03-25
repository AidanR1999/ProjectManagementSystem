var express = require('express');
var jwt = require('jsonwebtoken');
var config = require("../config");
var User = require("../models/User");
var Database = require("../data/DatabaseAO");

var router = express.Router();
var _dbo = new Database();

//home page
router.get('/', function(req, res) {
    //check if user has token
    var token = req.cookies.auth;
    if(token) {
        res.redirect('/project/')
        return;
    }
    //else render home
    res.render('home', {})
    return;
});

//account settings
router.get('/account', function(req, res) {
    //get logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(err, data) {
        _dbo.getUserById(data.id, function(user) {
            res.render('account', user);
            return;
        })
        return;
    });
    return;
});

//login
router.post('/login', function(req, res) {

    _dbo.login(req.body.email, req.body.password)
        .then((user) => {
            var token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
            res.cookie('auth', token);
            res.redirect('/project/');
        })
        .catch((err) => {
            console.log("Error:");
            console.log(JSON.stringify(err))
        });
});

//register
router.post('/register', function(req, res) {
    //create user object
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    _dbo.register(user, req.body.password)
        .then((user) => {
            //send token
            var token = jwt.sign(user, config.secret, {expiresIn: 86400});
            res.cookie('auth', token);
            res.redirect('/project/');
        })
        .catch((err) => {
            console.log("Error:");
            console.log(JSON.stringify(err))
        });
});

//update account details
router.post('/update', function(req, res) {
    //get logged in user
    var token = req.cookies.auth;

    //create object
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }

    jwt.verify(token, config.secret, function(err, data) {
        user._id = data.id;
        _dbo.updateUserDetails(user, function(user) {
            res.redirect('/account');
            return;
        })
        return;
    });
    return;
});
//change password
router.post('/changepassword', function(req, res) {
    //get logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(err, data) {
        _dbo.changePassword(data.id, req.body.password, function(user) {
            res.redirect('/account');
            return;
        });
        return;
    });
    return;
});

//delete account
router.post('/deleteaccount', function(req, res) {
    res.redirect('/project/');
    return;
});

//logout
router.get('/logout', function(req, res) {
    //clear token
    res.cookie('auth', "");
    res.redirect('/');
    return;
})

module.exports = router;