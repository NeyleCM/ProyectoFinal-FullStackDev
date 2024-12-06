require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const swaggerUI = require("swagger-ui-express");
const docs = require("./config/docs/index");
const dbConnection = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const { getAllProducts } = require("./controllers/productControllers");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));
console.log("Rutas de productos registradas en /api/products");

app.get("/", getAllProducts)

app.use((req, res) => res.status(404).json({ error: "Página no encontrada" }));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
