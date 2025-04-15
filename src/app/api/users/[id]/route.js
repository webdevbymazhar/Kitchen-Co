import User from '@/models/user';
import { connectMongoDB } from '../../../../../lib/connect';

// Connect to MongoDB
const connectDB = async () => {
  await connectMongoDB();
};

// GET request to fetch user data
export const GET = async (req, { params }) => {
  const { id } = params; // Extracting ID from params

  await connectDB();

  try {
    const user = await User.findById(id);
    if (!user) return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to fetch user', error: error.message }), { status: 500 });
  }
};

// PUT request to update user data
export const PUT = async (req, { params }) => {
  const { id } = params; // Extracting ID from params
  const body = await req.json(); // Parsing the request body

  await connectDB();

  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    if (!updatedUser) return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to update user', error: error.message }), { status: 500 });
  }
};
