const express = require("express");
const data = require("./data.json");
const { projects } = data;
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:id", (req, res) => {
  const projectID = req.params.id;
  const project = projects.find(({ id }) => id === parseInt(projectID));
  res.render("project", { project });
});

app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  err.message = "Sorry, the page you are looking for cannot be found";
  console.log(err);
  res.render("page-not-found", { err });
});

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
