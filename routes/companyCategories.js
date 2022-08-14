const express = require("express");
const {
  createCompanyCategory,
  deleteCompanyCategory,
  getAllCompanyCategory,
} = require("../controller/companyCategory");
const { checkToken } = require("../middleware/protect");

const router = express.Router();

//api/v1/companyCategories
router.route("/").post(createCompanyCategory).get(getAllCompanyCategory);

router.route("/:id").delete(deleteCompanyCategory);

module.exports = router;
