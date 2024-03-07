const mongoose = require("mongoose");

// Define el esquema del producto
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Define el modelo del producto
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
