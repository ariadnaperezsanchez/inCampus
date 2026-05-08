const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/User");

// Controlador para el registro de usuarios
const register = async (req, res, next) => {
  try {
    const { nombre, apellido1, apellido2, email, password, rol, activo } = req.body;

    if (!nombre || !apellido1 || !apellido2 || !email || !password || !rol) {
      return res.status(400).json({
        message: "Faltan campos obligatorios",
      });
    }

    if (!["ALUMNO", "PROFESOR"].includes(rol)) {
      return res.status(400).json({
        message: "Rol no válido",
      });
    }
// Verificar si el usuario ya existe por email
    Usuario.obtenerUsuarioPorEmail(email, async (err, usuarioExistente) => {
      if (err) return next(err);

      if (usuarioExistente) {
        return res.status(400).json({
          message: "El usuario ya existe",
        });
      }

// Hash de la contraseña antes de guardar el usuario
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

// controller para el login de usuarios
const login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }
// Buscar el usuario por email para verificar credenciales
    Usuario.obtenerUsuarioPorEmail(email, async (err, usuario) => {
      if (err) return next(err);

      console.log("EMAIL RECIBIDO:", email);
      console.log("USUARIO ENCONTRADO:", usuario ? "SI" : "NO");

      if (!usuario) {
        return res.status(401).json({
          message: "Credenciales inválidas",
        });
      }

      console.log("EMAIL BD:", usuario.email);
      console.log("ACTIVO:", usuario.activo);
      console.log("HASH BD:", usuario.password_hash);

      if (usuario.activo === 0) {
        return res.status(401).json({
          message: "Usuario inactivo",
        });
      }

// Comparar la contraseña recibida con el hash almacenado en la base de datos
      const passwordValida = await bcrypt.compare(password, usuario.password_hash);

      console.log("PASSWORD VALIDA:", passwordValida);

      if (!passwordValida) {
        return res.status(401).json({
          message: "Credenciales inválidas",
        });
      }
// si son validas, generar un token jwt con la info del usuario y devolverla en respuesta para el frontend
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