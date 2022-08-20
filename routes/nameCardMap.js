const express = require("express");
const {
  createNameCardMap,
  getTargetNameCards,
  deleteNameCardMap,
  getTargetNameCardsWithData,
  handleRequest,
  getAllRequest,
  getAllNameCardMaps,
  checkIsFriend,
} = require("../controller/nameCardMap");
const { checkToken } = require("../middleware/protect");

const router = express.Router();
router.route("/").post(createNameCardMap).get(getAllNameCardMaps);
router.route("/request").post(handleRequest);
router.route("/checkIsFriend").post(checkIsFriend);
router.route("/request/:id").get(getAllRequest);
router.route("/:id").get(getTargetNameCards).delete(deleteNameCardMap);
router.route("/:id/data").get(getTargetNameCardsWithData);

module.exports = router;
