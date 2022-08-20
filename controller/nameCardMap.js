const NameCardMap = require("../model/nameCardMap");
const Company = require("../model/company");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const path = require("path");

exports.createNameCardMap = asyncHandler(async (req, res, next) => {
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
  const nameCardMap = await NameCardMap.findByIdAndDelete(req.params.id);

  const relation = await NameCardMap.findOneAndDelete({
    sourceId: nameCardMap.targetId,
    targetId: nameCardMap.sourceId,
  });

  if (!nameCardMap) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: [nameCardMap, relation],
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

exports.getAllNameCardMaps = asyncHandler(async (req, res, next) => {
  const nameCardMap = await NameCardMap.find();

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

  let arr = [];

  nameCardMap.forEach(async (el, index) => {
    const com = await Company.findById(el.targetId.companyId);
    nameCardMap[index].targetId.companyId = com;
    // arr.push(el);
  });

  if (!nameCardMap) {
    throw new MyError("Амжилтгүй", 400);
  }
  setTimeout(() => {
    res.status(200).json({
      success: true,
      data: nameCardMap,
    });
  }, 500);
});

exports.handleRequest = asyncHandler(async (req, res, next) => {
  let nameCardMap;
  if (req.body.isFriend == "2") {
    nameCardMap = await NameCardMap.create(req.body);
  } else if (req.body.isFriend == "1") {
    const newData = {
      sourceId: req.body.sourceId,
      targetId: req.body.targetId,
      isFriend: req.body.isFriend,
    };
    nameCardMap = await NameCardMap.findByIdAndUpdate(req.body.id, newData);
    const newNameCardData = {
      sourceId: req.body.targetId,
      targetId: req.body.sourceId,
      isFriend: "1",
    };
    const newNameCardMap = await NameCardMap.create(newNameCardData);
  }

  if (!nameCardMap) {
    throw new MyError("Нэрийн хуудас олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: nameCardMap,
  });
});

exports.getAllRequest = asyncHandler(async (req, res, next) => {
  const nameCardMap = await NameCardMap.find({
    targetId: req.params.id,
  }).populate("sourceId");

  if (!nameCardMap) {
    throw new MyError("Нэрийн хуудас олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: nameCardMap,
  });
});

exports.checkIsFriend = asyncHandler(async (req, res, next) => {
  const nameCardMap = await NameCardMap.find({
    targetId: req.body.targetId,
    sourceId: req.body.sourceId,
  });

  if (!nameCardMap) {
    throw new MyError("Нэрийн хуудас олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: nameCardMap,
  });
});
