import Reservation from "@/models/Reservation";
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
    const session = JSON.parse(sessionHeader); // Ensure the session JSON string is parsed
    const userEmail = session.email; // Access the email property

    // Fetch reservations for the logged-in user based on their email
    const reservations = await Reservation.find({ email: userEmail }); // Ensure 'email' exists in your Reservation model
    
    return new Response(JSON.stringify({ success: true, reservations }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error); // Log the error for debugging
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}
