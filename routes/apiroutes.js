const db = require("../models");

//scraping tools
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = app => {
  // scrape articles
  app.get("/articles/scrape", (req, res) => {
    getArticles();
  });

  // get all articles
  app.get("/articles", (req, res) => {
    db.Article.find({})
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // grab a specific article by id and populate comment(s)
  app.get("/articles/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate("comment")
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.post("/articles/:id", (req, res) => {
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
  
}

const getArticles = () => {
  axios.get("https://www.huffingtonpost.com/section/us-news")
    .then(response => {
      const $ = cheerio.load(response.data);

      $(".card__headlines").each(function (i, e) {
        const result = {};

        result.title = $(this)
          .children("div")
          .children("a")
          .children(".card__headline__text")
          .text()
          .replace("\n", "");
        result.link = "https://www.huffingtonpost.com" + $(this)
          .children("div")
          .children("a")
          .attr("href");

        //console.log(result);
        
        // create new article with result object
        db.Article.create(result)
          .then(dbArticle => {
            // view result in console
            console.log("hi again");
            console.log(dbArticle);
            res.json(dbArticle);
          })
          .catch(err => {
            // if error, return to client
            return res.json(err);
          });
      });
    });
  // if articles were successfully scraped and saved, send a message to client
  console.log("Scrape Complete");
};

// run to test scraper
getArticles();