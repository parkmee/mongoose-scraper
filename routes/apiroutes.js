const db = require("../models");

//scraping tools
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = app => {
  // scrape articles
  app.get("/", (req, res) => {
    getArticles();
  });

  // put request to save article
  app.put("/saved/:id", (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { isSaved: true }
    )
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      if (err) throw err;
    });
  });

  // put request to hide "deleted" articles from view
  app.put("/article/delete/:id", (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { isCleared: true }
    )
    .then(data => {
      res.json(data);
      console.log(data);
    })
    .catch(err => {
      if (err) throw err;
    });
  });

  // put request to hide "deleted" articles from view
  app.put("/saved/:id", (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { isCleared: true }
    )
    .then(data => {
      res.json(data);
      console.log(data);
    })
    .catch(err => {
      if (err) throw err;
    });
  });

  // grab a specific article by id and populate comment(s)
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