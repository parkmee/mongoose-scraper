const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    db.Article.find({ isSaved: false, isCleared: false })
      .then(dbArticle => {
        const hbsObject = {
          articles: dbArticle
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
      });
  });

  // get saved articles
  app.get("/saved", (req, res) => {
    db.Article.find({ isSaved: true, isCleared: false })
      .populate("comment")
      .sort({ timestamp: "desc" })
      .then(dbArticle => {
        const hbsObject = {
          articles: dbArticle
        };
        console.log(hbsObject);
        res.render("saved", hbsObject);
      });
  });

  app.get("*", (req, res) => {

  })
};