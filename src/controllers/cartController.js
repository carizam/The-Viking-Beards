const Cart = require("../models/cart");

const cartController = {
  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCartById: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCart: async (req, res) => {
    try {
      const newCart = new Cart(req.body);
      await newCart.save();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCart: async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCart: async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.json({ message: "Cart deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = cartController;
