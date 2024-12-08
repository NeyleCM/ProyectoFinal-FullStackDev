const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
} else {
  admin.app(); 
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  
  if (!token) return res.status(403).send("Token required");

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid;
    console.log("Token verificado correctamente, UID:", req.uid); 
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).send("Invalid token");
  }
};

module.exports = verifyToken;

