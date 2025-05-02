const express = require("express");
const {
  getEventAllUsers,
  addEventUser,
  removeEventUser,
  updateEventUser,
} = require("../controller/eventMap");

const router = express.Router();

router
  .route("/:id")
  .get(getEventAllUsers)
  .delete(removeEventUser)
  .put(updateEventUser);
router.route("/").post(addEventUser);

module.exports = router;
