import mongoose, { models, mongo } from "mongoose";

const ContentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

const Content = models.Content || mongoose.model("Content", ContentSchema);

export default Content;
