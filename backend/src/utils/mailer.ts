import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;

const APP_URL = process.env.NODE_ENV === "production"
  ? process.env.APP_URL || ""
  : process.env.APP_URL_DEV || "http://localhost:3000";

export const sendVerificationEmail = async (to: string, token: string) => {
  const verifyUrl = `${APP_URL}/verify-email/${token}`;

  const mailOptions = {
    from: `"Mentha CMS" <${process.env.MAIL_USER}>`,
    to,
    subject: "Verify your email",
    html: `
      <h2>Welcome to Mentha CMS</h2>
      <p>Please click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const resetUrl = `${APP_URL}/reset-password/${token}`;

  const mailOptions = {
    from: `"Mentha CMS" <${process.env.MAIL_USER}>`,
    to,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};