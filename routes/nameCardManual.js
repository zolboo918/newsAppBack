const express = require("express");
const {
  deleteNameCardManual,
  getNameCardManual,
  getNameCardManualByUserId,
  uploadNameCardManualPhotoFront,
  uploadNameCardManualPhotoBack,
  createNameCardManual,
} = require("../controller/nameCardManual");

const router = express.Router();
//api/v1/nameCardManual/
router.route("/").post(createNameCardManual);
router.route("/:id").delete(deleteNameCardManual).get(getNameCardManual);
router.route("/:id/photoFront").post(uploadNameCardManualPhotoFront);
router.route("/:id/photoBack").post(uploadNameCardManualPhotoBack);
router.route("/user/:id").get(getNameCardManualByUserId);

module.exports = router;
