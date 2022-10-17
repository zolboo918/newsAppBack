const express = require("express");
const {
  deleteComment,
  getAllComment,
  getComment,
  getNewsAllComment,
  getNewsCommentCount,
  updateComment,
  writeComment,
} = require("../controller/NewsComment");
const { checkToken } = require("../middleware/protect");

const router = express.Router();

router.route("/").post(checkToken, writeComment).get(checkToken, getAllComment);
router.route("/:id").post(writeComment);
router.route("/:newsId/comment").get(getNewsAllComment);
router.route("/:newsId/commentCount").get(getNewsCommentCount);

router
  .route("/:id")
  .delete(checkToken, deleteComment)
  .get(checkToken, getComment)
  .put(checkToken, updateComment);

module.exports = router;
