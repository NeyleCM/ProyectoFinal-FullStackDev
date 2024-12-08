const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No se encontraron productos" });
    }
    return res.status(200).json(products); 
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
};

exports.fetchAllProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    throw new Error("Error al obtener los productos");
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }
    res.json(product);
  } catch (error) {
    next(error); 
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    if (products.length === 0) {
      return res.status(404).json({ error: "No se encontraron productos en esta categoría" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error.message);
    return res.status(500).json({ error: "Error al obtener productos" });
  }
};

const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  image: Joi.string().uri().required(),
});

exports.createProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newProduct = new Product(req.body);    
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el producto" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock, image, size } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      category,
      price,
      stock,
      image
    }, { new: true }); 

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("Error en la eliminación del producto:", error);
    return res.status(500).json({ error: "Error en la eliminación del producto" });
  }
};
