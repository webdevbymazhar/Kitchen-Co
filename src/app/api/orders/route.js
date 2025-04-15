// src/app/api/orders/route.js
import Order from '@/models/Order';
import { connectMongoDB } from '../../../../lib/connect';

export const POST = async (req) => {
    try {
        await connectMongoDB();

        const { items, orderTime, tableNumber, serverName, notes } = await req.json();
        const newOrder = new Order({
            items,
            orderTime: new Date(orderTime), // Ensure it's in Date format
            tableNumber,
            serverName,
            notes,
        });

        await newOrder.save();
        return new Response(JSON.stringify({ message: 'Order created successfully' }), { status: 201 });
    } catch (error) {
        console.error('Failed to save order:', error);
        return new Response(JSON.stringify({ error: 'Error saving order' }), { status: 500 });
    }
};


export async function GET(req) {
    await connectMongoDB();
  
    try {
      const orders = await Order.find(); // Fetch all orders from the database
      return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      return new Response(JSON.stringify({
        success: false,
        message: "Error fetching orders",
      }), { status: 500 });
    }
  }