import mongoose, { models } from "mongoose";

const FeedBackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const FeedBack = models.FeedBack || mongoose.model("FeedBack", FeedBackSchema);

export default FeedBack;
