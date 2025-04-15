// src/app/api/dishes/[id]/route.js

import Dish from "@/models/Dish";
import { connectMongoDB } from "../../../../../lib/connect";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();
    const dish = await Dish.findById(id);

    if (!dish) {
      return new Response("Dish not found", { status: 404 });
    }

    return new Response(JSON.stringify(dish), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("An error occurred while fetching the dish", {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  await connectMongoDB();
  try {
    const { id } = params; // Extract `id` from the URL path

    if (!id) {
      return new Response(JSON.stringify({ error: "Dish ID not provided" }), {
        status: 400,
      });
    }

    // Find and delete the dish by ID
    const dish = await Dish.findByIdAndDelete(id);

    if (!dish) {
      return new Response(JSON.stringify({ error: "Dish not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Dish deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting dish:", error);
    return new Response(JSON.stringify({ error: "Error deleting dish" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  await connectMongoDB();

  const { id } = params; // Extract the dish ID from the request
  const data = await req.json();

  try {
    const updatedDish = await Dish.findByIdAndUpdate(id, data, { new: true });

    if (!updatedDish) {
      return new Response(JSON.stringify({ message: "Dish not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedDish), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to update dish",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
