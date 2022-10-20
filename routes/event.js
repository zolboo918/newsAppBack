const express = require("express");
const {
  createEvent,
  getAllEvent,
  getEventByDate,
} = require("../controller/event");

const router = express.Router();

router.route("/").post(createEvent);
router.route("/:date").get(getEventByDate);

module.exports = router;
