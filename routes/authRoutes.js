var express = require('express');
var jwt = require('jsonwebtoken');
var config = require("../config");
var User = require("../models/User");
var _dbo = require("../data/DatabaseAO");

var router = express.Router();

//home page
router.get('/', function(req, res) {
    res.render('home', {})
});

//account settings
router.get('/account', function(req, res) {
    //get logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(err, data) {
        _dbo.getUserById(data._id)
            .then((user) => {
                res.render("account", user);
            })
    });
});

//login
router.post('/login', function(req, res) {

    console.log("started login");
    //console.log(req.body.email, req.body.password);
    _dbo.login(req.body.email, req.body.password)
        .then((user) => {
            console.log("logged in");
            var token = jwt.sign({_id: user._id}, config.secret, {expiresIn: 86400});
            res.cookie('auth', token);
        }).then(result => {
            res.redirect('/project/');
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

//register
router.post('/register', function(req, res) {
    //create user object
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    console.log("makes it here");
    

    var cookie = req.cookies.auth;

    _dbo.register(user, req.body.password)
        .then((user) => {
            //send token
            if (cookie === undefined)
            {
                var token = jwt.sign({_id: user._id}, config.secret, {expiresIn: 86400});
                res.cookie('auth', token);
            }
            else
            {
                console.log('cookie exists', cookie);
            }
            
        }).then((result) => {
            res.redirect('/project/');
        })
        .catch((err) => {
            console.log("Error:");
            console.log(JSON.stringify(err));
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
        user._id = data._id;
        _dbo.updateUserDetails(user)
            .then((user) => {
                res.redirect("/account");
            });
    });
});

//change password
router.post('/changepassword', function(req, res) {
    //get logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(err, data) {
        _dbo.changePassword(data._id, req.body.password)
            .then((user) => {
                console.log("changed");
                res.redirect("/account");
            });
    });
});

//delete account
router.post('/deleteaccount', function(req, res) {
    //get logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(err, data) {
        _dbo.deleteAccount(data._id)
            .then(() => {
                res.redirect("/");
            });
    });
});

//logout
router.get('/logout', function(req, res) {
    //clear token
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;