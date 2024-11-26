const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount");

if (!serviceAccount) {
  throw new Error("Credenciales de Firebase inválidas o no configuradas.");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase conectado exitosamente");