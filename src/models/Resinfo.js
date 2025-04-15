import mongoose, { models } from "mongoose";

const resSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Resinfo = models.Resinfo || mongoose.model("Resinfo", resSchema);

export default Resinfo;
