const express = require("express");
const mongoose = require("mongoose");
const admin = require("./config/firebase");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const swaggerUI = require('swagger-ui-express')
const docs = require("./config/docs/index");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const dbConnection = require("./config/db");
const serviceAccount = require("./config/serviceAccount");
const authMiddleware = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorHandler");

dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.use((req, res) => res.status(404).json({ error: "Página no encontrada" }));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});