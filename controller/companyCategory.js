const CompanyCategory = require("../model/CompanyCategory");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");

exports.getAllCompanyCategory = asyncHandler(async (req, res, next) => {
  const category = await CompanyCategory.find();
  if (!category) {
    throw new MyError("Байгууллагын ангилал олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.createCompanyCategory = asyncHandler(async (req, res, next) => {
  const dbCategory = await CompanyCategory.create(req.body);

  if (!dbCategory) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbCategory,
  });
});

exports.deleteCompanyCategory = asyncHandler(async (req, res, next) => {
  const dbCategory = await CompanyCategory.findByIdAndDelete(req.params.id);

  if (!dbCategory) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbCategory,
  });
});
