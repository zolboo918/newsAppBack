const express = require("express");
const {
  createCompany,
  getAllCompany,
  uploadCompanyLogo,
  getCompany,
} = require("../controller/company");
const { checkToken } = require("../middleware/protect");

const router = express.Router();
//api/v1/company/
router.route("/").post(createCompany).get(getAllCompany);
router.route("/:id").get(getCompany);
router.route("/:id/logo").post(uploadCompanyLogo);

module.exports = router;
