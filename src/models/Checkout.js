// src/models/Checkout.js
import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema({
  email: { type: String, required: true },
  country: { type: String },
  name: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  apartment: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cart: [
    {
      name: String,
      image: String,
      quantity: Number,
      price: Number,
    },
  ],
  OrderStatus: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  }, 
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Checkout || mongoose.model("Checkout", CheckoutSchema);
