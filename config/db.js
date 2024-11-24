const mongoose = require("mongoose");
require('dotenv').config();

const dbConnection = async () => {
  try {
    console.log("Conectado a la base de datos");
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error("Error al conectar a la base de datos: ", err);
  }
};

module.exports = dbConnection;

/*
const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Salir de la app si hay error
  }
};

module.exports = dbConnection;
*/
