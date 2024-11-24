const express = require("express");
const router = express.Router();
const {
  getProductsByCategory,
  deleteProduct,
  createProduct,
  getAllProducts,
} = require("../controllers/productControllers");
const verifyToken = require("../middlewares/authMiddleware.js");

// Rutas para productos
router.get("/", getAllProducts);                
router.get("/:category", verifyToken, getProductsByCategory); 
router.post("/", verifyToken, createProduct);             
router.delete("/:id/delete", verifyToken, deleteProduct);    

module.exports = router; 