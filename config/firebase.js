const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase inicializado correctamente.");
module.exports = admin;