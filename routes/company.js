const express = require("express");
const {
  createCompany,
  getAllCompany,
  uploadCompanyLogo,
  uploadCompanyCover,
  getCompany,
} = require("../controller/company");
const { checkToken } = require("../middleware/protect");

const router = express.Router();
//api/v1/company/
router.route("/").post(createCompany).get(getAllCompany);
router.route("/:id").get(getCompany);
router.route("/:id/logo").post(uploadCompanyLogo);
router.route("/:id/cover").post(uploadCompanyCover);

module.exports = router;
