const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

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

    const token = jwt.sign({ id: user._id, email: user.email }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = { login, register };

/*
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = { id: 1, email };
  const token = jwt.sign(user, 'your_jwt_secret', { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
};

const register = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  };
  

module.exports = { login, register };
*/

/*
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Aquí iría la lógica para validar al usuario
    res.status(200).json({ message: 'Login successful' });
};

const register = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Aquí iría la lógica para registrar al usuario
    res.status(201).json({ message: 'User registered successfully' });
};

module.exports = { login, register };
*/