// src/models/Deal.js
import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  categories: { type: [String], required: true },
  images: { type: [String], required: true }, // Array of image URLs
  mainImage: { type: String, required: true }, // URL for main image
  isActive: { type: Boolean, default: true }, // Active status of the deal
}, { timestamps: true });

const Deal = mongoose.models.Deal || mongoose.model('Deal', dealSchema);

export default Deal;
