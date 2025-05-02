const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  date: {
    type: String,
    default: new Date().toISOString().split("T")[0],
  },
  time: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Эвент болох өдрийг заавал оруулна уу"],
  },
  description: {
    type: String,
  },
  attendeeCount: {
    type: Number,
  },
});

module.exports = mongoose.model("Event", EventSchema);
