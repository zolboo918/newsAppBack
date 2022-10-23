const asyncHandler = require("../middleware/asyncHandler");
const Event = require("../model/event");
const EventMap = require("../model/eventMap");
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
  const event = await Event.find({ date: req.params.date }, null, {
    sort: { time: 1 },
  });

  if (!event) {
    throw MyError("Эвент олдсонгүй");
  }

  let arr = [];

  for (let i = 0; i < event.length; i++) {
    const item = event[i];
    const el = await EventMap.find({ eventId: item._id }).populate("userId");
    arr.push({ ...item._doc, users: el });
  }

  res.status(200).json({
    success: true,
    data: arr,
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

exports.getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw MyError("Эвент олдсонгүй");
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});
