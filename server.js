const express = require("express");
const app = express();
const port = 3000;

const budgets = require("./models/budget");
const methodOverride = require("method-override");

//Middleware
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

//near the top, around other app.use() calls needed this for req.body to exist
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

//INDEX
app.get("/budgets", (req, res) => {
  res.render("index.ejs", { allBudgets: budgets });
});

//route to create a new budget
app.get("/budgets/new", (req, res) => {
  res.render("new.ejs");
});

// route to the index of budget
app.get("/budgets/:idxBudget", (req, res) => {
  res.render("show.ejs", { budget: budgets[req.params.idxBudget] });
});

app.listen(port, () => {
  console.log("hello");
});
