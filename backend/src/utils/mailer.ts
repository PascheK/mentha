import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // ex: "smtp.infomaniak.com"
  port: Number(process.env.MAIL_PORT), // ex: 587
  secure: false, // true pour port 465, false pour 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const verifyUrl = `${process.env.APP_URL}/verify-email/${token}`;

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
