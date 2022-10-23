const express = require("express");
const { getUserNotes } = require("../controller/news");
const {
  registerUser,
  loginUser,
  updateUserInfo,
  getUsers,
  forgotPassword,
  uploadUserNameCardBack,
  uploadUserNameCardFront,
  resetPassword,
  getUser,
  deleteUser,
  passwordChange,
  newPassword,
} = require("../controller/users");

const { checkToken } = require("../middleware/protect");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/forgot-password").post(forgotPassword);
router.route("/check-token").post(resetPassword);
router.route("/reset-password").post(newPassword);

// router.route("/:id/change-password").post(passwordChange);

router.route("/").get(getUsers);
router.route("/:id/backImage").post(uploadUserNameCardBack);
router.route("/:id/frontImage").post(uploadUserNameCardFront);

// router
//   .route("/:id")
//   .put(checkToken, updateUserInfo)
//   .get(checkToken, getUser)
//   .delete(deleteUser);

// router.route("/:id/notes").get(checkToken, getUserNotes);

module.exports = router;
