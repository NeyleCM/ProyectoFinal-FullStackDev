const Product = require("../models/productModel");

// exports.getAllProducts = async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// };

// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al obtener los productos" });
//   }
// };

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // Devuelve mensaje si no hay productos
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No se encontraron productos" });
    }
    return res.status(200).json(products); // Productos
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Función reutilizable
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
    next(error); // Pasa el error al middleware centralizado
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
// exports.getProductsByCategory = async (req, res) => {
//   const { category } = req.params;
//   const products = await Product.find({ category });
//   res.json(products);
// };

const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  image: Joi.string().uri().required(),
  size: Joi.string().required(),
});

exports.createProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);// Validar datos
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newProduct = new Product(req.body);    // Crear y guardar producto
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el producto" });
  }
};
/*
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

*/

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock, image, size } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      category,
      price,
      stock,
      image,
      size,
    }, { new: true }); // `new: true` devuelve el producto actualizado

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
  await Product.findByIdAndDelete(id);
  res.status(204).send();
};
