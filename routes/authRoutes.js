var express = require('express');
var jwt = require('jsonwebtoken');
var config = require("../config");
var User = require("../models/User");
var _dbo = require("../data/DatabaseAO");

var router = express.Router();

//home page
router.get('/', function(req, res) {
    res.render('home', {
        errorMessage: req.flash('error')
    })
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
            req.flash('error', 'Wrong username or password');
            res.redirect('/');
        });
});

//register
router.post('/register', function(req, res) {
    //create user object
    var newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;

    var cookie = req.cookies.auth;

    _dbo.getUserByEmail(newUser.email)
    .then((user) => {
        if(user)
        {
            req.flash('error', 'This email is already taken');
            res.redirect('/');
        }
    })
    .catch(() =>{
        _dbo.register(newUser, req.body.password)
            .then((newUser) => {
                //send token
                if (cookie === undefined)
                {
                    var token = jwt.sign({_id: newUser._id}, config.secret, {expiresIn: 86400});
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
    })

    

    
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