import dotenv from "dotenv";

dotenv.config();

import nodemailer from "nodemailer";

console.log("MAIL USER:", process.env.EMAIL_USER);

console.log("MAIL PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
