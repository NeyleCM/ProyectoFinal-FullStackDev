require("dotenv").config();
const admin = require("firebase-admin");

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
}

module.exports = admin;
/*
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount");

if (!serviceAccount) {
  throw new Error("Credenciales de Firebase inválidas o no configuradas.");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase conectado exitosamente");
*/