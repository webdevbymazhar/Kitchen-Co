import Checkout from "@/models/Checkout";
import { connectMongoDB } from "../../../../../lib/connect";

export async function GET(req) {
  try {
    await connectMongoDB();
    
    // Fetch all orders
    const orders = await Checkout.find({});
    
    return new Response(JSON.stringify({ success: true, orders }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}