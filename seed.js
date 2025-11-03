const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product"); // Adjust path if needed

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Array of products with image paths
const products = [
  // Electronics
 { name: "Laptop", price: 74999, image: "/uploads/l.jpeg", category: "electronics", currency: "INR" },
  { name: "Smartphone", price: 29999, image: "/uploads/s.jpeg", category: "electronics", currency: "INR" },
  { name: "Smartwatch", price: 14999, image: "/uploads/sm.webp", category: "electronics", currency: "INR" },
  { name: "Television", price: 55999, image: "/uploads/tv.avif", category: "electronics", currency: "INR" },
  { name: "Earbuds", price: 2999, image: "/uploads/e.webp", category: "electronics", currency: "INR" },

  // Clothing
  { name: "T-Shirt", price: 899, image: "/uploads/tt.jpeg", category: "clothing", currency: "INR" },
  { name: "Jeans", price: 1999, image: "/uploads/j.jpeg", category: "clothing", currency: "INR" },
  { name: "Jacket", price: 3499, image: "/uploads/ja.avif", category: "clothing", currency: "INR" },
  { name: "Dress", price: 2599, image: "/uploads/d.webp", category: "clothing", currency: "INR" },
  { name: "Shirt", price: 1499, image: "/uploads/shirt.jpeg", category: "clothing", currency: "INR" },

  // Accessories
  { name: "Headphones", price: 2499, image: "/uploads/h.jpeg", category: "accessories", currency: "INR" },
  { name: "Watch", price: 4999, image: "/uploads/Nw.jpeg", category: "accessories", currency: "INR" },
  { name: "Sunglasses", price: 1599, image: "/uploads/su.jpeg", category: "accessories", currency: "INR" },
  { name: "Handbag", price: 2799, image: "/uploads/b.webp", category: "accessories", currency: "INR" },
  { name: "Cap", price: 499, image: "/uploads/c.webp", category: "accessories", currency: "INR" },
];

// Seed function
const seedProducts = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products); // Insert seed data
    console.log("Products seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding products:", err);
    mongoose.disconnect();
  }
};

seedProducts();
