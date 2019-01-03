// setup router
const express = require("express");
const router = express.Router();

// scraping tools
const cheerio = require("cheerio");
const axios = require("axios");

// require models
const db = require("../models");

const getArticles = () => {
  axios.get("https://www.huffingtonpost.com/section/us-news")
    .then(response => {
      const $ = cheerio.load(response.data);

      $(".card__headline").each((i, element) => {
        // object for article
        const result = {};

        // save article content in result object
        result.title = $(this)
          .children("a")
          .children("div")
          .text()
          .replace("\n", "")
          .replace(/\\/g, "")
          .trim();
        result.link = "https://www.huffingtonpost.com" + $(this)
          .children("a")
          .attr("href");

        // create new article with result object
        db.Article.create(result)
          .then(dbArticle => {
            // view result in console
            console.log(dbArticle);
          })
          .catch(err => {
            // if error, return to client
            return res.json(err);
          });
      });
      // if articles were successfully scraped and saved, send a message to client
      res.send("Scrape Complete");
    });
}

// ROUTES *******************************************************
// route to scrape website
router.get("/scrape", (req, res) => {
  getArticles();
});

// route to get all articles in database
router.get("/articles", (req, res) => {
  db.Article.find({})
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

// route to get specific article by id and populate related notes
router.get("/article/:id", (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    .populate("comment")
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

// route to delete selected article
router.get("/delete-article/:id", (req, res) => {
  db.Article.remove({ _id: req.params.id })
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

// route to save/update associated comment
router.post("/add-comment/:id", (req, res) => {
  db.Comment.create(req.body)
    .then(dbComment => {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { comment: dbComment._id },
        { new: true }
      );
    })
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

// route to delete all articles
router.delete("/delete-all", (req, res) => {
  db.Article.remove({})
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
