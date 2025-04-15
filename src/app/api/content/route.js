import { connectMongoDB } from '../../../../lib/connect';
import Content from '@/models/Content';
import sendEmail from '../../../../utils/nodemailer';

export async function POST(request) {
  try {
    await connectMongoDB(); // Ensure MongoDB connection is established

    const { name, email, message } = await request.json();

    // Save the data to MongoDB
    const newContact = new Content({ name, email, message });
    await newContact.save();

    // Send the message via email using Nodemailer
    const subject = 'New Contact Message';
    const emailContent = `
      You have received a new message from your website contact form:
      
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `;
    await sendEmail(subject, emailContent, process.env.RECIPIENT_EMAIL); // Send to the designated email

    return new Response('Message sent successfully!', { status: 200 });
  } catch (error) {
    console.error('Error handling form submission:', error);
    return new Response('Error submitting message', { status: 500 });
  }
}
