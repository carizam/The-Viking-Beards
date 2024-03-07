// Middleware para verificar la autenticación del usuario en las rutas de la API
const authenticateUser = (req, res, next) => {
  if (req.session.user) {
    // Si el usuario está autenticado, permitir el acceso a la siguiente ruta
    next();
  } else {
    // Si el usuario no está autenticado, devolver un error de acceso no autorizado
    res
      .status(401)
      .json({ error: "Acceso no autorizado. Por favor, inicia sesión." });
  }
};

module.exports = { authenticateUser };
