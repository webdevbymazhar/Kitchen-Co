import Checkout from "@/models/Checkout";
import { connectMongoDB } from "../../../../../lib/connect";

export async function GET(req) {
  try {
    await connectMongoDB();

    // Get session from request headers
    const sessionHeader = req.headers.get('session');
    if (!sessionHeader) {
      return new Response(JSON.stringify({ success: false, message: "No session found" }), {
        status: 401,
      });
    }

    // Parse session to extract email
    const session = JSON.parse(sessionHeader); // Ensure to parse the session JSON string
    const userEmail = session.email; // Access the email property

    // Fetch orders for the logged-in user based on their email
    const orders = await Checkout.find({ email: userEmail }); // Ensure 'email' exists in your Checkout model
    
    return new Response(JSON.stringify({ success: true, orders }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching orders:', error); // Log the error for debugging
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}
