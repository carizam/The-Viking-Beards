const express = require("express");
const router = express.Router();

// Ruta para mostrar la página de inicio
router.get("/", (req, res) => {
  res.render("index");
});

// Otras rutas para renderizar diferentes vistas

module.exports = router;
