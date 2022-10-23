const asyncHandler = require("../middleware/asyncHandler");
const EventMap = require("../model/eventMap");
const MyError = require("../utils/myError");

exports.addEventUser = asyncHandler(async (req, res, next) => {
  const user = await EventMap.create(req.body);

  if (!user) {
    throw new MyError("хэрэглэгч байхгүй байна");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
exports.updateEventUser = asyncHandler(async (req, res, next) => {
  const user = await EventMap.findOne({
    eventId: req.params.id,
    userId: req.body.userId,
  });

  if (!user) {
    throw new MyError("хэрэглэгч байхгүй байна");
  }

  user.type = req.body.type;
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.removeEventUser = asyncHandler(async (req, res, next) => {
  const user = await EventMap.findOneAndDelete(req.params.id);

  if (!user) {
    throw new MyError("хэрэглэгч байхгүй байна");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getEventAllUsers = asyncHandler(async (req, res, next) => {
  const user = await EventMap.find({ eventId: req.params.id }).populate(
    "userId"
  );

  if (!user) {
    throw new MyError("хэрэглэгч байхгүй байна");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
