const NewsLike = require("../model/newsLike");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");

exports.likePost = asyncHandler(async (req, res, next) => {
  const like = await NewsLike.create(req.body);

  if (!like) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: like,
  });
});

exports.getNewsLikes = asyncHandler(async (req, res, next) => {
  const like = await NewsLike.find({ newsId: req.params.id }).populate(
    "userId"
  );

  if (!like) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: like,
  });
});

exports.unlikeNews = asyncHandler(async (req, res, next) => {
  const dbLike = await NewsLike.find({
    newsId: req.body.newsId,
    userId: req.body.userId,
  });

  let like;
  dbLike.forEach(async (el) => {
    like = await NewsLike.findByIdAndDelete(el._id);
    if (!like) {
      throw new MyError("Амжилтгүй", 400);
    }
  });

  setTimeout(() => {
    res.status(200).json({
      success: true,
      data: like,
    });
  }, 200);
});

exports.getNewsLikeCount = asyncHandler(async (req, res, next) => {
  const id = req.params.newsId;
  const dbLike = await NewsLike.find({ newsId: id });
  if (!dbLike) {
    throw new MyError("Мэдээний ID явуулна уу", 400);
  }

  res.status(200).json({
    success: true,
    data: dbLike.length,
  });
});
