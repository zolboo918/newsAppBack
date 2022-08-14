const mongoose = require("mongoose");

const CompanyChildCategorySchema = mongoose.Schema({
  displayName: String,
  value: {
    type: String,
    unique: [true, "value"],
  },
  parentCategoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "CompanyCategory",
  },
});

module.exports = mongoose.model(
  "CompanyChildCategory",
  CompanyChildCategorySchema
);
