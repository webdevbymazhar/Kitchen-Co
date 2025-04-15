// // models/Reservation.js
// const mongoose = require("mongoose");

// const reservationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   guests: { type: Number, required: true },
//   specialRequest: { type: String },
//   type: { type: String, required: true, enum: ['Public', 'Private'] }, // Table type
//   table: { type: Number, required: true }, // Table number
//   seats: { type: Number, required: true }, // Number of seats
// });

// // Export the model
// const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);
// module.exports = Reservation;

// src/models/Reservation.js
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    specialRequest: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["Public", "Private"],
      required: true,
    },
    table: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    bookedStatus: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    }, // New field with default
  },
  { timestamps: true }
); // Add timestamps for createdAt and updatedAt

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);

export default Reservation;
