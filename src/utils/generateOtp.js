import OtpModel from '../model/otp.model.js';
import argon2 from 'argon2';

const generateOtp = async (email) => {
  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //  expires 15 mins from now

    // Delete any existing OTPs for this email
    await OtpModel.deleteMany({ email });

    // hash the code
    const hashedCode = await argon2.hash(code);

    // Save new OTP
    await OtpModel.create({ email, code: hashedCode, expiresAt });

    return code;
  } catch (error) {
    throw error;
  }
};

export default generateOtp;
