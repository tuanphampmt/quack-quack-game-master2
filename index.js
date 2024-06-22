const express = require("express");
const cron = require("node-cron");
const collectGoldenDuck = require("./scripts/collectGoldenDuck");
const app = express();
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1MTE5OSwidGltZXN0YW1wIjoxNzE4OTY4ODIwOTkxLCJ0eXBlIjoxLCJpYXQiOjE3MTg5Njg4MjAsImV4cCI6MTcxOTU3MzYyMH0.U4VtIuA0piy7uFIFa5FkhJbFToqUQ1P5IXQszEfDmQA";
app.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

collectGoldenDuck(ACCESS_TOKEN);

app.listen(3000, () => {
  console.log("Server ready on port 3000.");
});

module.exports = app;
