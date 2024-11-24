const Product = require("../models/ProductModel");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  res.json(products);
};

exports.createProduct = async (req, res) => {
  try {
    // Validación de campos necesarios
    const { name, category, price, stock, image, size } = req.body;
    if (!name || !category || !price || !stock || !image || !size) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    
    const newProduct = new Product({
      name,
      category,
      price,
      stock,
      image,
      size,
    });

    // Se guarda el producto en la base de datos
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el producto" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(204).send();
};