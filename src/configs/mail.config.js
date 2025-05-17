// src/config/mail.ts
import nodemailer from 'nodemailer';
import { config } from './app.config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export default transporter;
