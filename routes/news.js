const express = require("express");
const {
  getNote,
  updateNote,
  deleteNote,
  createNews,
  getAllNews,
} = require("../controller/news");
const { checkToken } = require("../middleware/protect");

const router = express.Router();
//api/v1/notes/
// router.route("/").post(checkToken, createNote).get(checkToken, getAllNotes);
router.route("/").post(createNews).get(getAllNews);

// router
//   .route("/:id")
//   .get(checkToken, getNote)
//   .put(checkToken, updateNote)
//   .delete(checkToken, deleteNote);

module.exports = router;
