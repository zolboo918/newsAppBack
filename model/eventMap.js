const mongoose = require("mongoose");

const EventMapSchema = mongoose.Schema({
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  type: Number, // 1 - zochin, 2 - interested, 3 - going
});

module.exports = mongoose.model("EventMap", EventMapSchema);
