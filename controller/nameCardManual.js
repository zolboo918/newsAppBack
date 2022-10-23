const mongoose = require("mongoose");
const NameCard = require("../model/nameCardManual");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const path = require("path");

// POST:  api/v1/nameCardManual/:id/photo
exports.uploadNameCardManualPhotoFront = asyncHandler(
  async (req, res, next) => {
    const nameCard = await NameCard.findById(req.params.id);
    if (!nameCard) {
      throw new MyError(req.params.id + " ID-тэй нэрийн хуудас байхгүй.", 400);
    }

    // image upload
    const file = req.files.file;

    if (!file.mimetype.startsWith("image")) {
      throw new MyError("Та зураг upload хийнэ үү.", 400);
    }

    file.name = `photo_manual_front_${req.params.id}${
      path.parse(file.name).ext
    }`;

    file.mv(`${process.env.COMPANY_LOGO_PATH}/${file.name}`, async (err) => {
      if (err) {
        throw new MyError(
          "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
          400
        );
      }

      nameCard.frontImage = `${file.name}`;
      await nameCard.save();

      res.status(200).json({
        success: true,
        data: file.name,
      });
    });
  }
);
exports.uploadNameCardManualPhotoBack = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findById(req.params.id);
  if (!nameCard) {
    throw new MyError(req.params.id + " ID-тэй нэрийн хуудас байхгүй.", 400);
  }

  // image upload
  const file1 = req.files.file;

  if (!file1.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  file1.name = `photo_manual_back_${req.params.id}${
    path.parse(file1.name).ext
  }`;

  file1.mv(`${process.env.COMPANY_LOGO_PATH}/${file1.name}`, async (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    nameCard.backImage = `${file1.name}`;
    await nameCard.save();

    res.status(200).json({
      success: true,
      data: file1.name,
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
