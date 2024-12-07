const admin = require("../config/firebase"); 
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const User = require("../models/UserModel");

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Este correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
      firebaseUid: user.uid, 
    });

    await newUser.save();

    const token = await user.getIdToken();

    res.status(201).json({ message: 'Usuario registrado con éxito', token });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario", message: error.message });
  }
};

/*
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
*/
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
    const user = await User.findById(req.uid); // Usa el `uid` que viene del middleware de autenticación
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res.status(500).json({ error: "Error al obtener el perfil del usuario" });
  }
};

/*
const getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token); 
    const userId = decodedToken.uid;

    res.status(200).json({ 
      message: "Usuario autenticado", 
      userId });
  } catch (error) {
    console.error("Error al obtener detalles del usuario:", error.message);
    res.status(500).json({ error: "Error al obtener información del usuario" });
  }
};
*/
module.exports = { login, register, getUserDetails };

