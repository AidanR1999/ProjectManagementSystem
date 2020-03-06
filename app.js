var express = require("express");
var mustache = require("mustache-express");
var path = require("path");
var Seed = require("./data/seed");
let seed = new Seed();

var app = express();
app.set("port", process.env.PORT || 3000);
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.resolve(__dirname, "views"));

//seed data
seed.init();
//seed.initProjects();


app.get("/", function(req, res) {
  res.status(200);
  res.type("text/html");
  res.send("<h1> Landing Page </h1>");
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next) {
  res.status(404);
  res.render("404");
});
// 500 error handler (middleware)
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500.html");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
