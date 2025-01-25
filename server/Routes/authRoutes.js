const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser
} = require("../controllers/authController.js");
const { VerifyToken } = require("../middlewares/jwt.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", 
  VerifyToken ,
  getUser);
router.post("/logout", logout);

module.exports = router;
