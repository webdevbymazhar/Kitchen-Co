// src/app/api/dishes/route.js
import Dish from '@/models/Dish';
import fs from 'fs';
import path from 'path';
import { connectMongoDB } from '../../../../lib/connect';

const uploadDir = path.join(process.cwd(), 'public', 'uploads'); // Directory for uploaded images

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export const POST = async (req) => {
    try {
        await connectMongoDB();

        const { name, description, price, category, images, ingredients, stock } = await req.json();

        // Handle image saving
        const imagePaths = await Promise.all(images.map(async (base64Image, index) => {
            const imageBuffer = Buffer.from(base64Image, 'base64'); // Convert base64 to buffer
            const imageName = `dish-image-${Date.now()}-${index}.png`; // Unique image name
            const imagePath = path.join(uploadDir, imageName);
            fs.writeFileSync(imagePath, imageBuffer); // Write the image file

            return `/uploads/${imageName}`; // Save path to the images array
        }));

        const newDish = new Dish({
            name,
            description,
            price,
            category,
            images: imagePaths,
            ingredients: JSON.parse(ingredients), // Convert ingredients back to array
            stock,
        });

        await newDish.save();
        return new Response(JSON.stringify(newDish), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Error creating dish', { status: 500 });
    }
};



export async function GET(req, res) {
    await connectMongoDB();
    try {
        const dishes = await Dish.find();
        return new Response(JSON.stringify(dishes), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch dishes' }), { status: 500 });
    }
}
export async function DELETE(req) {
    await connectMongoDB();
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id'); // Get dish ID from the request URL query

        if (!id) {
            return new Response(JSON.stringify({ error: 'Dish ID not provided' }), { status: 400 });
        }

        // Find and delete the dish
        const dish = await Dish.findByIdAndDelete(id);

        if (!dish) {
            return new Response(JSON.stringify({ error: 'Dish not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Dish deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error deleting dish' }), { status: 500 });
    }
}