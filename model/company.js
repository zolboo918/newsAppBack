const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Байгууллагын нэрийг оруулна уу"],
    unique: true,
  },
  logo: {
    type: String,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "CompanyCategory",
    required: [true, "Байгууллагын үйл ажиллагааны ангилал заавал оруулна уу"],
  },
  childCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "CompanyChildCategory",
    required: [true, "Байгууллагын үйл ажиллагааны чиглэл заавал оруулна уу"],
  },
  intro: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Имэйл заавал оруулна уу"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ],
    unique: true,
  },
  address: {
    type: String,
  },
  location: {
    type: String,
  },
  isOfficial: Boolean,
});

module.exports = mongoose.model("Company", CompanySchema);
