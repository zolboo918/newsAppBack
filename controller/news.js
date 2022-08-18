const News = require("../model/news");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const path = require("path");

// POST:  api/v1/company/:id/photo
exports.uploadNewsPhoto = asyncHandler(async (req, res, next) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    throw new MyError(req.params.id + " ID-тэй байгууллага байхгүй.", 400);
  }

  // image upload
  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  // if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
  //   throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
  // }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.COMPANY_LOGO_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    news.photo = `${file.name}`;
    news.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

exports.getAllNews = asyncHandler(async (req, res, next) => {
  const news = await News.find();
  if (!news) {
    throw new MyError("Тэмдэглэл олдсонгүй", 400);
  }
  let arr = [];
  news.forEach(async (element) => {
    const comm = await News.findById(element).populate("userId");
    arr.push(comm);
  });

  setTimeout(() => {
    res.status(200).json({
      success: true,
      data: arr,
    });
  }, 500);
});

exports.createNews = asyncHandler(async (req, res, next) => {
  const dbNews = await News.create(req.body);

  if (!dbNews) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbNews,
  });
});

// exports.getAllNotes = asyncHandler(async (req, res, next) => {
//   const notes = await Notes.find();

//   if (!notes) {
//     throw new MyError("Тэмдэглэл олдсонгүй", 400);
//   }

//   res.status(200).json({
//     success: true,
//     data: notes,
//   });
// });

// exports.getNote = asyncHandler(async (req, res, next) => {
//   const note = await Notes.findById(req.params.id);

//   if (!note) {
//     throw new MyError("Тэмдэглэл олдсонгүй", 400);
//   }

//   res.status(200).json({
//     success: true,
//     data: note,
//   });
// });

// exports.createNote = asyncHandler(async (req, res, next) => {
//   const dbNote = await Notes.create(req.body);

//   if (!dbNote) {
//     throw new MyError("Амжилтгүй", 400);
//   }

//   res.status(200).json({
//     success: true,
//     data: dbNote,
//   });
// });

// exports.updateNote = asyncHandler(async (req, res, next) => {
//   const note = await Notes.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!note) {
//     throw new MyError("Амжилтгүй", 400);
//   }

//   res.status(200).json({
//     success: true,
//     data: note,
//   });
// });

// exports.deleteNote = asyncHandler(async (req, res, next) => {
//   const note = await Notes.findByIdAndDelete(req.params.id);

//   if (!note) {
//     throw new MyError("Амжилтгүй", 400);
//   }

//   res.status(200).json({
//     success: true,
//     data: note,
//   });
// });

// exports.getUserNotes = asyncHandler(async (req, res, next) => {
//   const note = await Notes.find({ userId: req.params.id });

//   if (!note) {
//     throw new MyError("Тэмдэглэл олдсонгүй", 400);
//   }

//   res.status(200).json({
//     success: true,
//     data: note,
//   });
// });
