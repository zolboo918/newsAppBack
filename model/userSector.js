const mongoose = require("mongoose");

const UserSectorSchema = mongoose.Schema({
  displayName: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Sector", UserSectorSchema);
