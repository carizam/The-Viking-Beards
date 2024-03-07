const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  // Implementa la lógica de registro aquí
});

// Ruta para el inicio de sesión de usuarios
router.post("/login", authController.login);

module.exports = router;
