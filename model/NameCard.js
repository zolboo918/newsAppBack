const mongoose = require("mongoose");

const CardNameSchema = new mongoose.Schema({
  userId: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
  },
  image: String,
  lastName: {
    type: String,
    required: [true, "Хэрэглэгчийн овог оруулна уу"],
    maxLength: [50, "Хэрэглэгчийн овгийн урт дээд тал нь 50 байна"],
  },
  firstName: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг оруулна уу"],
    maxLength: [50, "Хэрэглэгчийн нэрийн урт дээд тал нь 50 байна"],
  },
  phone: {
    type: String,
    required: [true, "Утасны дугаар заавал оруулна уу"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Имэйл заавал оруулна уу"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ],
    unique: true,
  },
  position: {
    type: String,
    required: [true, "Албан тушаал заавал оруулна уу"],
  },
  companyID: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
  },
  sectorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Sector",
  },
  qr: String,
  note: String,
  isPublic: Boolean,
});

module.exports = mongoose.model("NameCard", CardNameSchema);
