// /utils/sendEmail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., 'gmail'
  auth: {
    user: "mubisherali934@gmail.com",
    pass: "mdqllyciympedyvz",
  },
});

export default async function sendEmail(to, message) {
  await transporter.sendMail({
    from: "mubisherali934@gmail.com",
    to,
    subject: "Please verify your otp",
    text: message,
  });
}