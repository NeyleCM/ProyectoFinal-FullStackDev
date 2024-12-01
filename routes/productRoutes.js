const express = require("express");
const router = express.Router();
const {
  getProductsByCategory,
  deleteProduct,
  createProduct,
  getAllProducts,
  updateProduct,
  getProduct
} = require("../controllers/productControllers");
const verifyToken = require("../middlewares/authMiddleware.js");

// CRUD productos
router.get("/", getAllProducts);
router.get("/category/:category", getProductsByCategory); 
router.get("/:id", getProduct); 
router.post("/", verifyToken, createProduct); 
router.put("/:id", verifyToken, updateProduct); 
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router; 