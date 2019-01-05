// dependencies
const mongoose = require("mongoose");
const moment = require("moment");

// save reference to Schema constructor
const Schema = mongoose.Schema;

// define article schema object
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

ArticleSchema.pre("remove", next => {
  Comment.remove({ article_id: this._id }).exec();
  next();
});

// create new article with mongoose
const Article = mongoose.model("Article", ArticleSchema);

// export model
module.exports = Article;