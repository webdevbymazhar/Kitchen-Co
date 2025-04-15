import { headers } from "next/headers";
import { connectMongoDB } from "../../../../lib/connect";
import Resinfo from "@/models/Resinfo";

export async function POST(req) {
  try {
    const { name, address, phone } = await req.json(); // Corrected: req.json()

    await connectMongoDB();

    await Resinfo.create({ name, address, phone });

    return new Response(
      JSON.stringify({ message: "Resinfo was sent successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Data was not sent successfully", error);
    return new Response(
      JSON.stringify({ error: "Data was not sent successfully" }),
      {
        status: 501,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  try {
    const resinfo = await Resinfo.find();
    return new Response(JSON.stringify(resinfo), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Erro fetching info");
    return new Response(JSON.stringify({ message: "Error in fetching info" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
