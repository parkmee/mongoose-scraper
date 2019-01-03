// dependencies
const express = require("express");

// establish port
const PORT = process.env.PORT || 8000;

// initialize express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware
app.use("/public", express.static(__dirname + "/public"));

// connect mongo database to mongoose
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadline";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, autoIndex: false });

// handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes
const apirouter = require("./routes/apiroutes.js");
const htmlrouter = require("./routes/htmlroutes.js");

app.use("/", htmlrouter);
app.use("/articles", apirouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
