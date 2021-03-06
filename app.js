//require
//====================================================================
const express = require('express');
const mustache = require("mustache-express");
const path = require("path");
// const Seed = require("./data/seed");
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');
var config = require("./config");
const _dbo = require('./data/DatabaseAO');

// user feedback
const flash = require('connect-flash');

//sessions

const session = require('express-session');
//express
//====================================================================
const app = express();

//configure
//====================================================================
app.set('port', process.env.PORT || 3000);
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.resolve(__dirname, "views"));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//allow cookies
app.use(cookieParser());

//seed database
//====================================================================
// let seed = new Seed();

// let seedAll = () => {
//   seed.initUser();
//   seed.initProjects();
// }

//seedAll();

_dbo.init();

//routes
//====================================================================
const authRouter = require('./routes/authRoutes');
const projectRouter = require('./routes/projectRoutes');


//sessions
app.use(session({
  secret: 'super-secret',
  resave: false,
  saveUninitialized: false

}));


//flash
app.use(flash());
//auth
app.use('/', authRouter);
//project
app.use('/project', projectRouter);


//404 requests
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

//error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})






//start server
//====================================================================
app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});

module.exports = app;