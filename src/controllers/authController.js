const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/User"); // ajusta la ruta

// =======================
// REGISTER
// =======================
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }

    // Comprobar si ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    // Hash de contraseña
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      email,
      password_hash,
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// LOGIN
// =======================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // Comparar contraseña
    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash
    );

    if (!passwordValida) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      }
    );

    res.json({
      message: "Login correcto",
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
/*const authModel = require("../models/Auth");

const login = (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email y password son obligatorios" });
  }

  authModel.buscarUsuarioPorEmail(email, (err, results) => {
    if (err) {
      console.error("ERROR LOGIN:", err);
      return res.status(500).json({ error: "Error en la consulta" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = results[0];

    if (usuario.password_hash !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    return res.json({
      message: "Login correcto",
      usuario,
    });
  });
};

module.exports = { login };*/