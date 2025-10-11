import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    demandCount: { type: Number, default: 0 }, // how many times it's been requested
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
