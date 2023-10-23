const express = require("express");
const data = require("./data.json");
const { projects } = data;
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");

app.use("/static", express.static("public"));

// Route to homepage - rendering index pug view with access to projects variable

app.get("/", (req, res) => {
  res.render("index", { projects });
});

// Route to about page

app.get("/about", (req, res) => {
  res.render("about");
});

// Route to project pages. Number in url is used to match with project ID from the data. Project view is rendered with the project available as a local

app.get("/project/:id", (req, res) => {
  const projectID = req.params.id;
  const project = projects.find(({ id }) => id === parseInt(projectID));
  res.render("project", { project });
});

// 404 Error Handler //

app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  err.message = "Sorry, the page you are looking for cannot be found";
  console.log(err);
  res.render("page-not-found", { err });
});

// Global Error Handler //

app.use((err, req, res, next) => {
  if (err.message && err.status) {
    console.log(err);
    res.render("error", { err });
  } else {
    err.message = "Sorry, something went wrong :/";
    err.status = 500;
    console.log(err);
    res.render("error", { err });
  }
});

app.listen(3000);
