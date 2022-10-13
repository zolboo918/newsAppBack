const mongoose = require("mongoose");
const User = require("../model/user");
const NameCard = require("../model/NameCard");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const PasswordResetEmail = require("../utils/email");
const crypto = require("crypto");
const sendGridEmailSender = require("../utils/sendGridMailSender");
const generateQrCode = require("../utils/generateQrCode");
const { isEmpty } = require("lodash");
const path = require("path");

exports.uploadUserNameCard = asyncHandler(async (req, res, next) => {
  const nameCard = await NameCard.findById(req.params.id);

  if (!nameCard) {
    throw new MyError(req.params.id + " ID-тэй нэрийн хуудас байхгүй.", 400);
  }

  // image upload
  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.COMPANY_LOGO_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    nameCard.image = `${file.name}`;
    nameCard.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

exports.registerUser = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const qr = await generateQrCode(data);
  const userBody = {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    companyName: data.companyName,
    qr,
    linkedInId: data.linkedInId,
    password: data.password,
    position: data.position.toUpperCase(),
    sectorId: data.sectorId,
  };
  const user = await User.create(userBody);

  if (!user) {
    throw new MyError("Хэрэглэгч бүртгэх амжилтгүй боллоо", 500);
  }

  const nameCardBody = {
    userId: user.id,
    backImage: data.backImage,
    frontImage: data.frontImage,
    note: data.note,
    isPublic: data.isPublic,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    workPhone: data.workPhone,
    profession: data.profession,
    aboutActivity: data.aboutActivity,
    email: data.email,
    companyName: data.companyName,
    qr,
    linkedInId: data.linkedInId,
    password: data.password,
    position: data.position.toUpperCase(),
    sectorId: data.sectorId,
  };

  const nameCard = await NameCard.create(nameCardBody);

  if (!nameCard) {
    throw new MyError("Хэрэглэгч бүртгэх амжилтгүй боллоо", 500);
  }

  const jwt = user.getJWT();

  res.status(200).json({
    success: true,
    data: {
      ...data,
      qr,
      userId: user.id,
      nameCardId: nameCard.id,
    },
    token: jwt,
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new MyError("Нэвтрэх нэр, нууц үг оруулна уу", 400);
  }
  let user;
  const isEmail = userName.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  if (!isEmpty(isEmail)) {
    user = await User.findOne({ email: userName }).select("+password");
  } else {
    user = await User.findOne({ phone: userName }).select("+password");
  }

  if (!user) {
    throw new MyError("Нэвтрэх нэр, үгээ шалгана уу", 401);
  }

  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new MyError("Нэвтрэх нэр, нууц үгээ шалгана уу", 401);
  }

  const token = user.getJWT();

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  let nameCardPhoto = "";
  const nameCard = await NameCard.findOne({ userId: user.id });
  if (nameCard) {
    nameCardPhoto = nameCard.image;
  }
  res.status(200).cookie("biz-card", token, cookieOptions).json({
    success: true,
    user,
    token,
    photo: nameCardPhoto,
    nameCardId: nameCard.id,
  });
});

exports.logOut = asyncHandler(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  };

  res.status(200).cookie("biz-card", null, cookieOptions).json({
    success: true,
    data: "logged out",
  });
});

exports.updateUserInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new MyError("Хэрэглэгчийн мэдээлэл олдсонгүй");
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    throw new MyError("Имэйл дамжуулна уу", 400);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new MyError("Хэрэглэгч олдсонгүй");
  }

  const resetCode = user.generateResetPasswordToken();

  await user.save();

  // const link = `https://www.zolboo.com/passwordReset/${resetToken}`;
  // PasswordResetEmail({
  //   to: "zolboojargalsaikhan9@gmail.com",
  //   subject: "Нууц үг сэргээх",
  //   html: `<b>Сайн байна уу</b><br><br>Та нууц үг сэргээх хүсэлт гаргасан байна. <br> Доорх линкээр дамжин нууц үгээ сэргээнэ үү.<br><br> <a href=${link}>${link}</a>`,
  // });

  sendGridEmailSender({
    to: `${req.body.email}`,
    html: `<b>Сайн байна уу</b><br><br>Та нууц үг сэргээх хүсэлт гаргасан байна. <br> Таний нууц үг сэргээх код: ${resetCode}`,
  });

  res.status(200).json({
    success: true,
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { token, email } = req.body;

  if (!token) {
    throw new MyError("код дамжуулна уу", 400);
  }

  const user = await User.findOne({
    email: email,
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new MyError("Токен, Имэйл шалгана уу", 400);
  }

  res.status(200).json({
    success: true,
  });
});

exports.newPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    resetPasswordToken: req.body.token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new MyError("Токен хүчингүй байна", 400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    user,
    token: user.getJWT(),
  });
});

exports.passwordChange = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("+password");

  if (!user) {
    throw new MyError("Хэрэглэгч олдсонгүй", 400);
  }

  const ok = await user.checkPassword(req.body.oldPassword);

  if (!ok) {
    throw new MyError("Хуучин нууц үг буруу байна", 400);
  }

  const newPassword = req.body.newPassword;

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});
