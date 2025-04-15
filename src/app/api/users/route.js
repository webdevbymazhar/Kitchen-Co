import User from '@/models/user';
import { connectMongoDB } from '../../../../lib/connect';

export async function GET(request) {
  try {
    await connectMongoDB(); // Connect to MongoDB

    const users = await User.find({}); // Fetch all users
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
