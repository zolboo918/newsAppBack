const asyncHandler = require("../middleware/asyncHandler");
const Event = require("../model/event");
const MyError = require("../utils/myError");

exports.createEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.create(req.body);

  if (!event) {
    throw MyError("Эвент олдсонгүй");
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

exports.getEventByDate = asyncHandler(async (req, res, next) => {
  const event = await Event.find({ date: req.params.date });

  if (!event) {
    throw MyError("Эвент олдсонгүй");
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

exports.getAllEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.find();

  if (!event) {
    throw MyError("Эвент олдсонгүй");
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});
