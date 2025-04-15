// import Checkout from "@/models/Checkout";
// import { connectMongoDB } from "../../../../../lib/connect";

// export async function GET(req) {
//   try {
//     await connectMongoDB();
    
//     // Fetch all orders
//     const orders = await Checkout.find({});
    
//     return new Response(JSON.stringify({ success: true, orders }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ success: false, message: error.message }), {
//       status: 500,
//     });
//   }
// }

import Checkout from "@/models/Checkout";
import { connectMongoDB } from "../../../../../lib/connect";

export async function GET(req) {
  try {
    await connectMongoDB();
    
    // Fetch total revenue based on totalPrice and count of orders
    const totalRevenue = await Checkout.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } } // Using totalPrice from the order model
    ]);

    const totalOrders = await Checkout.countDocuments();

    return new Response(
      JSON.stringify({
        success: true,
        totalRevenue: totalRevenue[0]?.total || 0, // Get total revenue from aggregation, default to 0
        totalOrders
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
      }
    );
  }
}
