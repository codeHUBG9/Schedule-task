const express = require("express");
const router = express.Router();

const {
	registerUser,
	loginUser,
	forgotPassword,
	resetPassword,
	getUserProfile,
	updatePassword,
	updateUser,
	logout,
	allUsers,
	getUserDetails,
	updateProfile,
	deleteUser,
} = require("../controller/authController");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me", getUserProfile);
router.route("/password/update").put(updatePassword);
router.route("/me/update").put(updateProfile);

router.route("/admin/users").get(allUsers);
router
	.route("/admin/user/:id")
	.get(getUserDetails)
	.put(updateUser)
	.delete(deleteUser);

module.exports = router;
