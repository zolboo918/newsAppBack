const NameCardMap = require("../model/nameCardMap");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const path = require("path");

exports.createNameCardMap = asyncHandler(async (req, res, next) => {
  console.log("req.body.sourceId :>> ", req.body.sourceId);
  console.log("req.body.targedId :>> ", req.body.targetId);
  const old = await NameCardMap.find({
    sourceId: req.body.sourceId,
    targetId: req.body.targetId,
  });
  if (old.length >= 1) {
    throw new MyError("Нэрийн хуудас нэмэгдсэн байна", 400);
  }
  const nameCardMap = await NameCardMap.create(req.body);

  if (!nameCardMap) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: nameCardMap,
  });
});

exports.deleteNameCardMap = asyncHandler(async (req, res, next) => {
  const nameCardMap = await NameCardMap.deleteMany({
    targetId: req.params.id,
  });

  if (!nameCardMap) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: nameCardMap,
  });
});

exports.getTargetNameCards = asyncHandler(async (req, res, next) => {
  const nameCardMap = await NameCardMap.find({ sourceId: req.params.id });

  if (!nameCardMap) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: nameCardMap,
  });
});

exports.getTargetNameCardsWithData = asyncHandler(async (req, res, next) => {
  const nameCardMap = await NameCardMap.find({
    sourceId: req.params.id,
  }).populate("targetId");

  if (!nameCardMap) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: nameCardMap,
  });
});
