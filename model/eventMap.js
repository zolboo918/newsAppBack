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
  type: Number,
});

module.exports = mongoose.model("EventMap", EventMapSchema);
