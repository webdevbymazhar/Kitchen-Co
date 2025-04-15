import { headers } from "next/headers";
import { connectMongoDB } from "../../../../lib/connect";
import FeedBack from "@/models/FeedBack";

export async function POST(req) {
  try {
    const { userId, name, review, stars } = await req.json();

    // Early return if any required field is missing
    if (!userId || !name || !review || stars == null) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectMongoDB();
    await FeedBack.create({ userId, name, review, stars });

    return new Response(
      JSON.stringify({ message: "Feedback sent successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Feedback submission failed:", error); // Log specific error
    return new Response(
      JSON.stringify({ message: "Failed to send feedback" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  await connectMongoDB();

  try {
    const fetchfeedback = await FeedBack.find();
    return new Response(JSON.stringify(fetchfeedback), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Failed to fetch the feedback");
    return new Response(
      JSON.stringify({ message: "Failed to fetch the Feedback" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
