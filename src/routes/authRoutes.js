const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

// Ruta para registrar un nuevo usuario
router.post("/register", authController.register);

// Ruta para el inicio de sesión de usuarios
router.post("/login", authController.login);

// Exporta el router para usarlo en tu server.js
module.exports = router;
