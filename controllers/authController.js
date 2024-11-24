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