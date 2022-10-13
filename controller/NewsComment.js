const Comment = require("../model/NewsComment");
const News = require("../model/news");
const User = require("../model/user");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");

exports.writeComment = asyncHandler(async (req, res, next) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    throw new MyError("Мэдээ олдсонгүй", 400);
  }
  const dbComment = await Comment.create({
    ...req.body,
    newsId: req.params.id,
  });

  await news.updateOne({ $push: { comments: dbComment._id } });

  const user = await User.findById(req.body.userId);

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
    user,
  });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const dbComment = await Comment.findById(req.params.id);

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  const news = await News.findByIdAndUpdate(dbComment.newsId, {
    $pull: { comments: dbComment._id },
  });

  if (!news) {
    throw new MyError("Ном олдсонгүй", 400);
  }

  dbComment.remove();

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  const dbComment = await Comment.findByIdAndUpdate(req.params.id, req.body);

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.getAllComment = asyncHandler(async (req, res, next) => {
  const dbComment = await Comment.find();

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  const dbComment = await Comment.find({ _id: req.params.id }).populate([
    "userId",
    "newsId",
  ]);

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.getNewsAllComment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    throw new MyError("Мэдээний ID явуулна уу", 400);
  }

  const news = await News.findById(id);

  if (!news) {
    throw new MyError("Мэдээний мэдээлэл байхгүй байна. ID шалгана уу", 400);
  }

  const { comments } = news;

  let comms = [];

  comments.forEach(async (element) => {
    const comm = await Comment.findById(element).populate("userId");
    comms.push(comm);
  });

  setTimeout(() => {
    res.status(200).json({
      success: true,
      data: comms,
    });
  }, 1000);
});

exports.getNewsCommentCount = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    throw new MyError("Мэдээний ID явуулна уу", 400);
  }

  const news = await News.findById(id);

  if (!news) {
    throw new MyError("Мэдээний мэдээлэл байхгүй байна. ID шалгана уу", 400);
  }

  const { comments } = news;

  res.status(200).json({
    success: true,
    data: comments.length,
  });
});
