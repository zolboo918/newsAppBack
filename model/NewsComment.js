const mongoose = require("mongoose");

const NewsCommentScheme = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  newsId: {
    type: mongoose.Schema.ObjectId,
    ref: "News",
    required: true,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("NewsComment", NewsCommentScheme);
