const mongoose = require("mongoose");

const NameCardMapScheme = new mongoose.Schema({
  sourceId: {
    type: mongoose.Schema.ObjectId,
    ref: "NameCard",
    requiresd: true,
  },
  targetId: {
    type: mongoose.Schema.ObjectId,
    ref: "NameCard",
    requiresd: true,
  },
});

module.exports = mongoose.model("NameCardMap", NameCardMapScheme);
