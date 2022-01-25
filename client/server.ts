// Host the build!!
const express = require("express");
const path = require("path");
const app = express();

// Prodution Server to run client.
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3000, () => {
  console.log("Client hosted on 3000!");
});
