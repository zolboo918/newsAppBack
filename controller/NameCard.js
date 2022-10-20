const mongoose = require("mongoose");
const NameCard = require("../model/NameCard");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const path = require("path");

exports.updateNameCard = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!nameCard) {
    throw new MyError("Нэрийн хуудасны мэдээлэл олдсонгүй");
  }

  res.status(200).json({
    success: true,
    nameCard,
  });
});

exports.getAllNameCards = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.find().populate("companyId");

  res.status(200).json({
    success: true,
    data: nameCard,
  });
});

exports.getNameCard = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findById(req.params.id).populate("companyId");

  res.status(200).json({
    success: true,
    data: nameCard,
  });
});

exports.getNameCardByUserId = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findOne({ userId: req.params.id }).populate(
    "companyId"
  );
  res.status(200).json({
    success: true,
    data: nameCard,
  });
});

exports.deleteNameCard = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: nameCard,
  });
});

exports.getNameCardPhoto = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findById(req.params.id);

  if (!nameCard) {
    throw new MyError("Нэрийн хуудасны мэдээлэл олдсонгүй");
  }

  res.status(200).json({
    success: true,
    data: nameCard.photo,
  });
});

exports.getNameCardByQr = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.find({ qr: req.params.qr });

  if (!nameCard) {
    throw new MyError("Нэрийн хуудасны мэдээлэл олдсонгүй");
  }

  res.status(200).json({
    success: true,
    data: nameCard,
  });
});

exports.uploadBackImage = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findById(req.params.id);

  if (!nameCard) {
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

  file.mv(`${process.env.COMPANY_LOGO_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    nameCard.backImage = `${file.name}`;
    nameCard.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
exports.uploadFrontImage = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findById(req.params.id);

  if (!nameCard) {
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

  file.mv(`${process.env.COMPANY_LOGO_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    nameCard.frontImage = `${file.name}`;
    nameCard.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
