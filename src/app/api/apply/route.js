import JobApplicant from '@/models/JobApplicant';
import { connectMongoDB } from '../../../../lib/connect';

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Get the data from the request body
    const { name, email, phone, jobType, experience, message } = await req.json();

    // Create a new JobApplicant instance
    const newApplicant = new JobApplicant({
      name,
      email,
      phone,
      jobType,
      experience,
      message,
    });

    // Save the applicant to the database
    await newApplicant.save();

    return new Response(JSON.stringify({ success: true, message: 'Application submitted successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Error submitting application.' }), { status: 500 });
  }
}
