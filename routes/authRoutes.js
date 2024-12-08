const express = require("express");
const router = express.Router();
const {
    //register,
    login,
    //getUserDetails,
  } = require("../controllers/authController");
  //const verifyToken = require("../middlewares/authMiddleware");

router.post("/login", login);
//router.post("/register", register);
//router.get("/profile", verifyToken, getUserDetails);

module.exports = router;