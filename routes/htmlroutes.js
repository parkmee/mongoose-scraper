// setup router
const express = require("express");
const router = express.Router();

// require models
const db = require("../models");

// index page
router.get("/", (req, res) => {
  db.Article.find({})
    .then( dbArticle => {
      const hbsObject = {
        articles: dbArticle
      };
      res.render("index", hbsObject);
    });
});

// saved articles
router.get("saved", (req, res) => {
  db.Article.find({ saved: true })
    .then( dbArticle => {
      const hbsObject = {
        articles: dbArticle
      };
      res.render("saved", hbsObject);
    });
});

router.get("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
