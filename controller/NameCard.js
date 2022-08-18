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
  const nameCard = await NameCard.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: nameCard,
  });
});

exports.getNameCardByUserId = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findOne({ userId: req.params.id });
  console.log("nameCard :>> ", nameCard);
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
