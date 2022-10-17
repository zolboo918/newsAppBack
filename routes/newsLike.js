const express = require("express");
const {
  likePost,
  getNewsLikes,
  unlikeNews,
  getNewsLikeCount,
} = require("../controller/newsLike");

const router = express.Router();

router.route("/").post(likePost);
router.route("/unlike").post(unlikeNews);
router.route("/:id").get(getNewsLikes);

router.route("/:newsId/likeCount").get(getNewsLikeCount);

module.exports = router;
