// dependencies
const mongoose = require("mongoose");

// save reference to Schema constructor
const Schema = mongoose.Schema;

// define article schema object
const CommentSchema = new Schema({
  heading: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// create new article with mongoose
const Comment = mongoose.model("Comment", CommentSchema);

// export model
module.exports = Comment;