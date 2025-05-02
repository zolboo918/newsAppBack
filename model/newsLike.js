const mongoose = require("mongoose");

const NewsLikeSchema = new mongoose.Schema({
  newsId: {
    type: mongoose.Schema.ObjectId,
    ref: "News",
    required: [true, "Мэдээний Id заавал явуулна"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Хэрэглэгчийн Id заавал явуулна"],
  },
});

module.exports = mongoose.model("NewsLike", NewsLikeSchema);
