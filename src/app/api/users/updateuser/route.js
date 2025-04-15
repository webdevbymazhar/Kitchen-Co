import User from "@/models/user";
import { connectMongoDB } from "../../../../../lib/connect";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { email, newRole } = req.body;

    if (!email || !newRole) {
      return res.status(400).json({ message: "Email and role are required." });
    }

    try {
      // Connect to MongoDB
      await connectMongoDB();

      // Find user by email and update their role
      const user = await User.findOneAndUpdate(
        { email: email },      // Search by email, not _id
        { role: newRole },
        { new: true }          // Return the updated user document
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Role updated successfully", user });
    } catch (error) {
      console.error("Error updating role:", error);
      return res.status(500).json({ message: "Error updating role", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
