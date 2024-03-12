// viewRoutes.js
const express = require("express");
const router = express.Router();

// Ruta para mostrar la página de inicio
router.get("/", (req, res) => {
  console.log("Accediendo a la ruta de inicio (/)");
  res.render("index");
});

// Ruta adicional para /index que muestra la misma vista que la ruta /
router.get("/index", (req, res) => {
  console.log("Accediendo a la ruta /index");
  res.render("index");
});

module.exports = router;
