const express = require("express");
const { getEventAllUsers, addEventUser } = require("../controller/eventMap");

const router = express.Router();
//api/v1/notes/
// router.route("/").post(checkToken, createNote).get(checkToken, getAllNotes);
router.route("/").post(getEventAllUsers);
router.route("/add").post(addEventUser);
// router.route("/:id/backImage").get(getNameCardPhoto).post(uploadBackImage);
// router.route("/:id/frontImage").get(getNameCardPhoto).post(uploadFrontImage);
// router.route("/user/:id").get(getNameCardByUserId);
// router.route("/qr/:qr").get(getNameCardByQr);

// router
//   .route("/:id")
//   .get(checkToken, getNote)
//   .put(checkToken, updateNote)
//   .delete(checkToken, deleteNote);

module.exports = router;
