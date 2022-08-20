const mongoose = require("mongoose");
const NameCard = require("../model/nameCardManual");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const path = require("path");

// POST:  api/v1/nameCardManual/:id/photo
exports.uploadNameCardManualPhoto = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findById(req.params.id);
  if (!nameCard) {
    throw new MyError(req.params.id + " ID-тэй нэрийн хуудас байхгүй.", 400);
  }

  // image upload
  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.COMPANY_LOGO_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    nameCard.image = `${file.name}`;
    nameCard.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

exports.getNameCardManual = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: nameCard,
  });
});

exports.getNameCardManualByUserId = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.find({ userId: req.params.id });
  res.status(200).json({
    success: true,
    data: nameCard,
  });
});

exports.deleteNameCardManual = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: nameCard,
  });
});

exports.createNameCardManual = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.create(req.body);

  res.status(200).json({
    success: true,
    data: nameCard,
  });
});
