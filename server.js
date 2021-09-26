const express = require("express");
const app = express();
const port = 3000;

const budgets = require("./models/budget");
const bodyParser = require("body-parser");

//Middleware
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

//near the top, around other app.use() calls needed this for req.body to exist
app.use(express.urlencoded({ extended: false }));

//parse application
app.use(bodyParser.urlencoded());

// parse application json
app.use(bodyParser.json());

//INDEX
app.get("/budgets", (req, res) => {
  //sum all amount of budget values from amount key
  let bankSum = (allBudgets) =>
    allBudgets.reduce((sum, item) => parseInt(item.amount) + sum, 0);
  console.log(bankSum(budgets));
  res.render("index.ejs", {
    allBudgets: budgets,
    bankAccount: bankSum(budgets),
  });

  console.log(budgets);
});

//NEW route to create a new budget
app.get("/budgets/new", (req, res) => {
  res.render("new.ejs");
});

// creats a new budget object stored in req.body
app.post("/budgets", (req, res) => {
  // add tags to array by seprating them by space (" ")
  let arrTags = [];
  arrTags = String(req.body.tags).split(" ");
  req.body.tags = arrTags;
  budgets.push(req.body);
  res.redirect("/budgets");
});

// route to the index of budget
app.get("/budgets/:idxBudget", (req, res) => {
  res.render("show.ejs", { budget: budgets[req.params.idxBudget] });
});

app.listen(port, () => {
  console.log("hello");
});
