const mongoose = require("mongoose");

const CompanyCategorySchema = mongoose.Schema({
  displayName: String,
  value: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("CompanyCategory", CompanyCategorySchema);
