// models/Dish.js
import mongoose, { Schema, models } from "mongoose";

const dishSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ["Appetizer", "Main Course", "Dessert", "Beverage"],
      required: true,
    },
    images: { type: [String], required: true }, // Store image paths
    ingredients: { type: [String], required: true },
    stock: { type: Number, required: true, min: 0 },
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Dish = models.Dish || mongoose.model("Dish", dishSchema);
export default Dish;
