const mongoose = require("mongoose");

const CompanyCategorySchema = mongoose.Schema({
  displayName: String,
  value: String,
});

module.exports = mongoose.model("CompanyCategory", CompanyCategorySchema);
