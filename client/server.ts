// Host the build!!
const express = require("express");
const path = require("path");
const app = express();

// Prodution Server to run client.
// Servied client into pm2 with -spa..
app.use(express.static(path.join(__dirname, "build")));

app.get("/console", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/account", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/docs", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/auth", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/docs", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/payment", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3002, () => {
  console.log("Client hosted on 3002!");
});
