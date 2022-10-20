const asyncHandler = require("../middleware/asyncHandler");
const EventMap = require("../model/eventMap");
const MyError = require("../utils/myError");

exports.addEventUser = asyncHandler(async (req, res, next) => {
  const user = await EventMap.create(req.body);

  if (!user) {
    throw MyError("хэрэглэгч байхгүй байна");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getEventAllUsers = asyncHandler(async (req, res, next) => {
  const user = await EventMap.find({ eventId: req.body.eventId }).populate(
    "userId"
  );

  if (!user) {
    throw MyError("хэрэглэгч байхгүй байна");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
