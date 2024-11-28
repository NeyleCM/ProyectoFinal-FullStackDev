require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const swaggerUI = require("swagger-ui-express");
const docs = require("./config/docs/index");
const dbConnection = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de productos. Usa /api/auth o /api/products para interactuar.");
});

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

/*
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const admin = require("./config/firebase");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const methodOverride = require("method-override");
const swaggerUI = require('swagger-ui-express')
const docs = require("./config/docs/index");

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
*/