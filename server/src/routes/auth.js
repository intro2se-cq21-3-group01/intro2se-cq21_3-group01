const authController = require("../controllers/authController");

const router = require("express").Router();

//REGISTER
router.post("/register", authController.registerUser);

//LOG IN
router.post("/login", authController.loginUser);

//LOG IN AND CHECK ROLE
router.post("/admin/login", authController.loginAndCheckRole);

// //LOG OUT
// router.post("/logout", verifyToken, authController.logOut);

// FORGOT PASSWORD
router.post("/forgot-password", authController.forgotPassword);

// RESET PASSWORD
router.get("/reset-password/:token", authController.resetPassword);

// CHANGE PASSWORD
router.post("/change-password", authController.changePassword);

module.exports = router;