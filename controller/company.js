const Company = require("../model/company");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");

// PUT:  api/v1/books/:id/photo
exports.uploadNewsPhoto = asyncHandler(async (req, res, next) => {
  const book = await News.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээ.", 400);
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

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    book.photo = file.name;
    book.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

exports.getAllCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.find();
  if (!company) {
    throw new MyError("Байгууллага олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: company,
  });
});

exports.createCompany = asyncHandler(async (req, res, next) => {
  const dbCompany = await Company.create(req.body);

  if (!dbCompany) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbCompany,
  });
});
