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
router.get("/", getAllProducts); // Obtener todos los productos
router.get("/:category", getProductsByCategory); // Obtener productos por categoría
router.get("/:id", verifyToken, getProduct); 
router.post("/", verifyToken, createProduct); // Crear producto
router.put("/:id", verifyToken, updateProduct); // Actualizar producto
router.delete("/:id", verifyToken, deleteProduct); // Eliminar producto

module.exports = router; 