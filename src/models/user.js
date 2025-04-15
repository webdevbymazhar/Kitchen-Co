import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      ContactNumber: {
        type: String,
        trim: true,
        default: "",
      },
      Country: {
        type: String,
        trim: true,
        default: "",
      },
      PostCode: {
        type: String,
        trim: true,
        default: "",
      },
      street: {
        type: String,
        trim: true,
        default: "",
      },
      city: {
        type: String,
        trim: true,
        default: "",
      },
      state: {
        type: String,
        trim: true,
        default: "",
      },
      zip: {
        type: String,
        trim: true,
        default: "",
      },
    },
    profilePicture: {
      type: String,
      default: "default-profile.png",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    role: {
      type: String,
      enum: [
        "customer",
        "chef",
        "driver",
        "admin",
        "vendor",
        "waiter",
        "superadmin",
      ],
      default: "customer",
    },
    otp: {
      type: String,
    },

    otpExpiresAt: { type: Date }, // OTP expiration time
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
