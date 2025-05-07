import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default async function sendMail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: `"GreenDev" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}
