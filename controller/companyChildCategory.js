const CompanyChildCategory = require("../model/CompanyChildCategory");
const CompanyCategory = require("../model/CompanyCategory");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");

exports.getAllCompanyChildCategory = asyncHandler(async (req, res, next) => {
  const category = await CompanyChildCategory.find();
  if (!category) {
    throw new MyError("Байгууллагын ангилал олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.getCompanyChildCategory = asyncHandler(async (req, res, next) => {
  const category = await CompanyChildCategory.find({
    parentCategoryId: req.params.id,
  });
  if (!category) {
    throw new MyError("Байгууллагын ангилал олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.createCompanyChildCategory = asyncHandler(async (req, res, next) => {
  const parentCategory = await CompanyCategory.findById(
    req.body.parentCategoryId
  );
  if (parentCategory) {
    const dbCategory = await CompanyChildCategory.create(req.body);

    if (!dbCategory) {
      throw new MyError("Амжилтгүй", 400);
    }

    res.status(200).json({
      success: true,
      data: dbCategory,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Parent category bhgu bn",
    });
  }
});

exports.deleteCompanyChildCategory = asyncHandler(async (req, res, next) => {
  const dbCategory = await CompanyChildCategory.findByIdAndDelete(
    req.params.id
  );

  if (!dbCategory) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbCategory,
  });
});
