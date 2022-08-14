const express = require("express");
const {
  createCompanyChildCategory,
  deleteCompanyChildCategory,
  getAllCompanyChildCategory,
} = require("../controller/companyChildCategory");
const { checkToken } = require("../middleware/protect");

const router = express.Router();
//api/v1/company/
router
  .route("/")
  .post(createCompanyChildCategory)
  .get(getAllCompanyChildCategory);

router.route("/:id").delete(deleteCompanyChildCategory);

module.exports = router;
