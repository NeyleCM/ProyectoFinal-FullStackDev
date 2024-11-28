const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded; // Incluye el usuario decodificado en la solicitud
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
};

module.exports = verifyToken;

/*
const admin = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']; 
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; 
    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
*/

/*
const admin = require("../config/firebase");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Leer el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token); // Verificar el token
    req.user = decodedToken; // Agregar la información del usuario al request
    next(); // Continuar al siguiente middleware o ruta
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
*/