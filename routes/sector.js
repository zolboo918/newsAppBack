const express = require("express");
const {
  createSector,
  deleteSector,
  getAllSector,
} = require("../controller/sector");
const { checkToken } = require("../middleware/protect");

const router = express.Router();
//api/v1/sector/
router.route("/").post(createSector).get(getAllSector);
router.route("/:id").delete(deleteSector);

module.exports = router;
