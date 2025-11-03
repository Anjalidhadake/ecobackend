const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get product by ID
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
});

// Add product (protected)
router.post("/", protect, async (req, res) => {
  const { name, price, image, category } = req.body;
  const product = new Product({ name, price, image, category });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update product (protected)
router.put("/:id", protect, async (req, res) => {
  const { name, price, image, category } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.category = category || product.category;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Delete product (protected)
router.delete("/:id", protect, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

module.exports = router;
