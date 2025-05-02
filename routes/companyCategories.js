const express = require("express");
const {
  createCompanyCategory,
  deleteCompanyCategory,
  getAllCompanyCategory,
  getCategory,
} = require("../controller/companyCategory");
const { checkToken } = require("../middleware/protect");

const router = express.Router();

//api/v1/companyCategories
router.route("/").post(createCompanyCategory).get(getAllCompanyCategory);

router.route("/:id").delete(deleteCompanyCategory).get(getCategory);

module.exports = router;
