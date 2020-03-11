var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require("../config");
var User = require("../models/User");
const DbContext = require("../Data/DbContext");


var router = express.Router();
let _context = new DbContext();

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
    console.log(req.body);
    //create user object
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.lastName;

    //hash the password
    user.passwordHash = bcrypt.hashSync(req.body.password, 8);
    
    //insert the user
    _context.Users.insert(user, function(err, docs) {
        if(err) {
            console.log("broke");
        }
        //create token
        var token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
        // res.status(200).send({
        //     auth: true,
        //     token: token
        // });
        res.redirect('/project/index');
    });
});

module.exports = router;