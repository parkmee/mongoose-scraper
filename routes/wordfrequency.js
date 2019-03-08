const express = require("express");
const app = express();
const db = require("../models");

class WordCounter {
  constructor() {
    this.titleText = [];
    this.titleTextMap = [];
    this.wordFrequencyCount = [];
    this.concatTitles();
    this.createTitleMap();
    this.sortByWordFreq();
  }
  concatTitles() {
    console.log("hi");
      db.Article.find({ isCleared: false })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          if (err) throw err;
        })
  }
  createTitleMap() {

  }
  sortByWordFreq() {

  }
}

const wordCounter = new WordCounter;
wordCounter.concatTitles();