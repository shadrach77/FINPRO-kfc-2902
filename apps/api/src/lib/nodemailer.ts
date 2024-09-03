import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from '@/config';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}`;
  const mailOptions = {
    from: NODEMAILER_EMAIL,
    to,
    subject: 'Verify your email',
    html: `
    <p>Hi there,</p>
    <p>Thanks for signing up. Please verify your email by clicking on the link below:</p>
    <a href="${url}">${url}</a>
    `,
  };
  await transporter.sendMail(mailOptions);