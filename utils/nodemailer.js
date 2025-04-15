import nodemailer from 'nodemailer';

const sendEmail = async (subject, message, recipientEmail) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider here (e.g., Gmail, Outlook, etc.)
    auth: {
      user: "mubisherali934@gmail.com", // Your email address
      pass: "mdqllyciympedyvz", // Your email password or app password
    },
  });

  // Email options
  const mailOptions = {
    from:"mubisherali934@gmail.com", // Sender email address
    to:  process.env.RECIPIENT_EMAIL, // Receiver email address
    subject: subject,
    text: message, // The message content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

export default sendEmail;
