const User = require("../models/UserModel");

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

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET,/*"your_jwt_secret",*/ {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = { login };
/*

const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

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

    res.status(200).json({ message: "Inicio de sesión exitoso", token, user });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};

module.exports = { login };

*/

/*const register = async (req, res) => {
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

    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    const newUser = new User({
      name,
      email,
      password: password, 
      firebaseUid: user.uid, 
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito', token });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario", message: error.message });
  }
};


const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.uid }); 
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res.status(500).json({ error: "Error al obtener el perfil del usuario" });
  }
};

module.exports = { login, register, getUserDetails };
*/
