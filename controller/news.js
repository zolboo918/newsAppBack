const News = require("../model/news");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const path = require("path");
const NameCard = require("../model/NameCard");

// POST:  api/v1/company/:id/photo
exports.uploadNewsPhoto = asyncHandler(async (req, res, next) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    throw new MyError(req.params.id + " ID-тэй байгууллага байхгүй.", 400);
  }

  // image upload
  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  // if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
  //   throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
  // }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.COMPANY_LOGO_PATH}/${file.name}`, async (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    news.photo = `${file.name}`;
    await news.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

exports.getAllNews = asyncHandler(async (req, res, next) => {
  const news = await News.find({}, null, { sort: "-createdDate" }).populate(
    "userId"
  );
  if (!news) {
    throw new MyError("Мэдээ олдсонгүй", 400);
  }
  res.status(200).json({
    success: true,
    data: news,
  });
  // }, 1000);
});

exports.deleteNews = asyncHandler(async (req, res, next) => {
  const news = await News.findByIdAndDelete(req.params.id);
  if (!news) {
    throw new MyError("Мэдээ олдсонгүй", 400);
  }
  res.status(200).json({
    success: true,
    data: news,
  });
});

exports.createNews = asyncHandler(async (req, res, next) => {
  const dbNews = await News.create(req.body);

  if (!dbNews) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbNews,
  });
});

exports.newsViewCountAdd = asyncHandler(async (req, res, next) => {
  const news = await News.findByIdAndUpdate(req.params.id, {
    viewedCount: req.body.viewedCount,
  });
  if (!news) {
    throw new MyError("Амжилтгүй", 400);
  }
  res.status(200).json({
    success: true,
    data: news,
  });
});
