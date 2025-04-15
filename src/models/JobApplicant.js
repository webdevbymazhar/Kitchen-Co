import mongoose from "mongoose";

const JobApplicantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["rider", "waiter", "chef"],
      required: true,
    },
    experience: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const JobApplicant =
  mongoose.models.JobApplicant ||
  mongoose.model("JobApplicant", JobApplicantSchema);

export default JobApplicant;
