const Sector = require("../model/userSector");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");

exports.getAllSector = asyncHandler(async (req, res, next) => {
  const sector = await Sector.find();
  if (!sector) {
    throw new MyError("Байгууллага олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: sector,
  });
});

exports.getSector = asyncHandler(async (req, res, next) => {
  const sector = await Sector.findById(req.params.id);
  if (!sector) {
    throw new MyError("Салбар олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: sector,
  });
});

exports.createSector = asyncHandler(async (req, res, next) => {
  const dbSector = await Sector.create(req.body);

  if (!dbSector) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbSector,
  });
});

exports.deleteSector = asyncHandler(async (req, res, next) => {
  const dbSector = await Sector.findByIdAndDelete(req.params.id);

  if (!dbSector) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbSector,
  });
});
