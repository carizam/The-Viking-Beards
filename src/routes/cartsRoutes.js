const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { authenticateUser } = require("../middleware/authMiddleware");

// Ruta para obtener el carrito de un usuario
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Otras rutas para agregar, actualizar y eliminar productos del carrito

module.exports = router;
