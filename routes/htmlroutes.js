const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    db.Article.find({})
      .then(dbArticle => {
        const hbsObject = {
          articles: dbArticle
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
      });
  });

  app.get("/saved", (req, res) => {
    res.render("saved");
  });

  app.get("*", (req, res) => {
    
  })
};