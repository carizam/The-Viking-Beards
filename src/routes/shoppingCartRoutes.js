const express = require("express");
const router = express.Router();
const shoppingCartController = require("../controllers/shoppingCartController");

// Rutas para la gestión de carritos de compra
router.post("/", shoppingCartController.createCart);
router.get("/:id", shoppingCartController.getCartById);
router.put("/:id", shoppingCartController.updateCart);
router.delete("/:id", shoppingCartController.deleteCart);

router.post(
  "/:id/products/:productId",
  shoppingCartController.addProductToCart
);
router.put(
  "/:id/products/:productId",
  shoppingCartController.updateProductInCart
);
router.delete(
  "/:id/products/:productId",
  shoppingCartController.removeProductFromCart
);

module.exports = router;
