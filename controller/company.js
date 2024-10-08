const Company = require("../model/company");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const path = require("path");

// POST:  api/v1/company/:id/photo
exports.uploadCompanyLogo = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
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

  file.name = `photo_logo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.COMPANY_LOGO_PATH}/${file.name}`, async (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    company.logo = `${file.name}`;
    await company.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
exports.uploadCompanyCover = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    throw new MyError(req.params.id + " ID-тэй байгууллага байхгүй.", 400);
  }

  // image upload
  const file1 = req.files.file;

  if (!file1.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  // if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
  //   throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
  // }

  file1.name = `photo_cover_${req.params.id}${path.parse(file1.name).ext}`;

  file1.mv(`${process.env.COMPANY_LOGO_PATH}/${file1.name}`, async (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    company.cover = `${file1.name}`;
    await company.save();

    res.status(200).json({
      success: true,
      data: file1.name,
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

exports.getCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
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
