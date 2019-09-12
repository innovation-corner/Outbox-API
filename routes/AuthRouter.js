const express = require("express");
const router = express.Router();
const auth = require("../Controllers/AuthController");

router.post("/register", auth.registerAdmin);
router.post("/complete-registration/:id", auth.verifyUser);
router.post("/login", auth.login);
router.post("/reset-password", auth.resetPassword);
router.post("/verify-code", auth.verifyCode);
router.post("/send-code", auth.resetLink);

module.exports = router;
