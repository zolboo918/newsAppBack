const express = require("express");
const {
  createEvent,
  getAllEvent,
  getEventByDate,
  getEvent,
} = require("../controller/event");

const router = express.Router();

router.route("/").post(createEvent);
router.route("/:date").get(getEventByDate);
router.route("/event/:id").get(getEvent);

module.exports = router;
