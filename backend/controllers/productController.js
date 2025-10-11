import Product from "../models/Product.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, quantity, imageUrl } = req.body;
    const product = await Product.create({
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ msg: "Failed to create product", error: err });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch products" });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch product" });
  }
};

// Update
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ msg: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update product" });
  }
};

// Delete
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete product" });
  }
};
