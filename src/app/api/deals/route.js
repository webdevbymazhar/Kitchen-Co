// api/deals/route.js
import Deal from "@/models/Deal";
import { connectMongoDB } from "../../../../lib/connect";

export async function POST(req) {
  await connectMongoDB();  // Connect to the MongoDB

  try {
    const dealData = await req.json();  // Parse the incoming JSON

    // Log the incoming data for debugging
    console.log("Received deal data:", dealData);

    const newDeal = new Deal(dealData);
    await newDeal.save();  // Save deal to the database

    return new Response(JSON.stringify({ message: 'Deal added successfully!' }), {
      status: 201,  // Success status code
    });
  } catch (error) {
    console.error('Error while adding deal:', error);

    // Send an error response
    return new Response(JSON.stringify({ error: 'Failed to add deal' }), {
      status: 500,
    });
  }
}


export async function GET(req) {
  await connectMongoDB();

  try {
    const deals = await Deal.find();  // Fetch all deals from the database
    return new Response(JSON.stringify(deals), { status: 200 });
  } catch (error) {
    console.error("Error fetching deals:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch deals" }), { status: 500 });
  }
}