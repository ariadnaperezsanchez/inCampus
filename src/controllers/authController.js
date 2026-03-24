const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/User");

console.log("ENTRANDO EN REGISTER NUEVO");

const register = async (req, res, next) => {
  try {
    const { nombre, apellido1, apellido2, email, password, rol, activo } = req.body;

    if (!nombre || !apellido1 || !apellido2 || !email || !password || !rol) {
      return res.status(400).json({
        message: "Faltan campos obligatorios",
      });
    }

    Usuario.obtenerUsuarioPorEmail(email, async (err, usuarioExistente) => {
      if (err) return next(err);

      if (usuarioExistente) {
        return res.status(400).json({
          message: "El usuario ya existe",
        });
      }

      const password_hash = await bcrypt.hash(password, 10);

      Usuario.crearUsuario(
        nombre,
        apellido1,
        apellido2,
        email,
        password_hash,
        rol,
        activo ?? 1,
        (err, nuevoUsuario) => {
          if (err) return next(err);

          return res.status(201).json({
            message: "Usuario registrado correctamente",
            usuario: nuevoUsuario,
          });
        }
      );
    });
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    Usuario.obtenerUsuarioPorEmail(email, async (err, usuario) => {
      if (err) return next(err);

      if (!usuario) {
        return res.status(401).json({
          message: "Credenciales inválidas",
        });
      }

      if (usuario.activo === 0) {
        return res.status(401).json({
          message: "Usuario inactivo",
        });
      }

      const passwordValida = await bcrypt.compare(password, usuario.password_hash);

      if (!passwordValida) {
        return res.status(401).json({
          message: "Credenciales inválidas",
        });
      }

      const token = jwt.sign(
        {
          id: usuario.id_usuario,
          email: usuario.email,
          rol: usuario.rol,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login correcto",
        token,
        user: {
          id: usuario.id_usuario,
          nombre: usuario.nombre,
          apellido1: usuario.apellido1,
          apellido2: usuario.apellido2,
          email: usuario.email,
          rol: usuario.rol,
          activo: usuario.activo,
        },
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};