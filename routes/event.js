const express = require("express");
const {
  createEvent,
  getAllEvent,
  getEventByDateFilter,
  getEventByDate,
  getEvent,
} = require("../controller/event");

const router = express.Router();

router.route("/").post(createEvent);
router.route("/events/:date").get(getEventByDate);
router.route("/filter/:date1/:date2").get(getEventByDateFilter);
router.route("/event/:id").get(getEvent);

module.exports = router;
