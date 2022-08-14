const express = require("express");
const { createCompany, getAllCompany } = require("../controller/company");
const { checkToken } = require("../middleware/protect");

const router = express.Router();
//api/v1/company/
router.route("/").post(createCompany).get(getAllCompany);

module.exports = router;
