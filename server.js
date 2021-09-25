const express = require("express");
const app = express();
const port = 3000;

const budgets = require("./models/budget");

//INDEX
app.get("/budgets", (req, res) => {
  res.render("index.ejs", { allBudgets: budgets });
});

app.get("/budgets/:idxBudget", (req, res) => {
  res.render("show.ejs", { budget: budgets[req.params.idxBudget] });
});

app.listen(port, () => {
  console.log("hello");
});
