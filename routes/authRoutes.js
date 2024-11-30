const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getUserDetails, // Detalles del usuario logueado
  } = require("../controllers/authController");
  const verifyToken = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/register", register);
router.get("/me", verifyToken, getUserDetails); // Información del usuario logueado


module.exports = router;