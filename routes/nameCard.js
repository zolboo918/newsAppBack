const express = require("express");
const {
  getAllNameCards,
  deleteNameCard,
  getNameCard,
  updateNameCard,
  getNameCardPhoto,
  getNameCardByUserId,
  getNameCardByQr,
  uploadBackImage,
  uploadFrontImage,
} = require("../controller/NameCard");

const router = express.Router();
//api/v1/notes/
// router.route("/").post(checkToken, createNote).get(checkToken, getAllNotes);
router.route("/").get(getAllNameCards);
router
  .route("/:id")
  .put(updateNameCard)
  .delete(deleteNameCard)
  .get(getNameCard);
router.route("/:id/backImage").get(getNameCardPhoto).post(uploadBackImage);
router.route("/:id/frontImage").get(getNameCardPhoto).post(uploadFrontImage);
router.route("/user/:id").get(getNameCardByUserId);
router.route("/qr/:qr").get(getNameCardByQr);

// router
//   .route("/:id")
//   .get(checkToken, getNote)
//   .put(checkToken, updateNote)
//   .delete(checkToken, deleteNote);

module.exports = router;
