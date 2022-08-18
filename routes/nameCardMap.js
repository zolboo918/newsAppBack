const express = require("express");
const {
  createNameCardMap,
  getTargetNameCards,
  deleteNameCardMap,
  getTargetNameCardsWithData,
} = require("../controller/nameCardMap");
const { checkToken } = require("../middleware/protect");

const router = express.Router();
router.route("/").post(createNameCardMap);
router.route("/:id").get(getTargetNameCards).delete(deleteNameCardMap);
router.route("/:id/data").get(getTargetNameCardsWithData);

module.exports = router;
