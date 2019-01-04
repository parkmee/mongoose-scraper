// dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 8000;

// handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
//app.use("/public", express.static(__dirname + "/public"));

// mongoose
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadline";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// router
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


// start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});