// src/app/api/checkout/route.js
import Checkout from "@/models/Checkout";
import { connectMongoDB } from "../../../../lib/connect";

export async function POST(req) {
  try {
    await connectMongoDB();
    const data = await req.json();

    const newCheckout = new Checkout({
      ...data,
      orderStatus: data.orderStatus || "pending", // Set default to "pending" if not provided
    });
    
    await newCheckout.save();

    return new Response(JSON.stringify({ success: true, message: "Checkout saved successfully", orderStatus: newCheckout.orderStatus }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}
