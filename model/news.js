const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Мэдээнд гарчиг оруулна уу"],
  },
  body: {
    type: String,
    required: [true, "Мэдээний агуулга оруулна уу"],
  },
  photo: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  nameCardId: {
    type: mongoose.Schema.ObjectId,
    ref: "NameCard",
  },
  videoLink: {
    type: String,
  },
  viewedCount: Number,
});

// const NoteSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "Тэмдгэлэлд гарчиг оруулна уу"],
//     unique: [true, "Тэмдэглэлийн гарчиг давхцаж байна"],
//   },
//   note: {
//     type: String,
//     required: [true, "Тэмдэглэл оруулна уу"],
//   },
//   writedAt: {
//     type: Date,
//     default: Date.now(),
//   },
//   userId: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//   },
//   bookName: {
//     type: String,
//     required: true,
//   },
//   authorName: {
//     type: String,
//     required: true,
//   },
// });

module.exports = mongoose.model("News", NewsSchema);
