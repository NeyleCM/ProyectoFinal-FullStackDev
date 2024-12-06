const admin = require("../config/firebase"); 
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const User = require("../models/UserModel");

const register = async (req, res) => {
  const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {

    const userCredential = await createUserWithEmailAndPassword(admin.auth(), email, password);
    const user = userCredential.user;

    const newUser = new User({
      email: email,
      firebaseUid: user.uid,
    });

    await newUser.save();

    const token = await user.getIdToken();

    res.status(201).json({ message: 'Usuario registrado con éxito', token });
  } catch (error) {
    console.error("Error al registrar el usuario:", error.message);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        uid: user.uid,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token); 
    const userId = decodedToken.uid;

    // Opcional: Detalles del usuario en la base de datos.
    res.status(200).json({ 
      message: "Usuario autenticado", 
      userId });
  } catch (error) {
    console.error("Error al obtener detalles del usuario:", error.message);
    res.status(500).json({ error: "Error al obtener información del usuario" });
  }
};

module.exports = { login, register, getUserDetails };

/*
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET,/*"your_jwt_secret",*/ 
    
    /* {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener información del usuario" });
  }
};

module.exports = { login, register, getUserDetails };
*/