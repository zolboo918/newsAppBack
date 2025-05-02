const express = require("express");
const {
  createCompanyChildCategory,
  deleteCompanyChildCategory,
  getAllCompanyChildCategory,
  getCompanyChildCategory,
} = require("../controller/companyChildCategory");
const { checkToken } = require("../middleware/protect");

const router = express.Router();
//api/v1/company/
router
  .route("/")
  .post(createCompanyChildCategory)
  .get(getAllCompanyChildCategory);

router
  .route("/:id")
  .delete(deleteCompanyChildCategory)
  .get(getCompanyChildCategory);

module.exports = router;
