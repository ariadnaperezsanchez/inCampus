const jwt = require("jsonwebtoken");
const Usuario = require("../models/User");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      Usuario.obtenerUsuarioPorEmail(decoded.email, (err, usuario) => {
        if (err) {
          return res.status(500).json({ message: "Error del servidor" });
        }

        if (!usuario) {
          return res.status(401).json({ message: "Usuario no encontrado" });
        }

        if (usuario.activo === 0) {
          return res.status(401).json({ message: "Usuario inactivo" });
        }

        req.user = {
          id: usuario.id_usuario,
          nombre: usuario.nombre,
          apellido1: usuario.apellido1,
          apellido2: usuario.apellido2,
          email: usuario.email,
          rol: usuario.rol,
          activo: usuario.activo,
        };

        return next();
      });
    } catch (error) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  } else {
    return res.status(401).json({ message: "No hay token" });
  }
};

const authorize = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({
        message: "No tienes permisos para acceder a este recurso",
      });
    }

    return next();
  };
};

module.exports = { protect, authorize };