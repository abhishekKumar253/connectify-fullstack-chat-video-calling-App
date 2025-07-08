import { resend } from "./resend.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Welcome to Connectify 🎉</h2>
        <p>Hello,</p>
        <p>Thank you for signing up on <strong>Connectify</strong>! To complete your registration, please verify your email address using the verification code below:</p>
        <div style="margin: 30px auto; text-align: center;">
          <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; background: #e3f2fd; padding: 10px 20px; border-radius: 8px; display: inline-block;">
            ${verificationToken}
          </span>
        </div>
        <p>This code is valid for the next 24 hours.</p>
        <p style="margin-top: 40px;">Cheers,<br/>The Connectify Team 🚀</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Connectify <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Email",
      html: htmlContent,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log("✅ Email sent successfully:", data);
  } catch (error) {
    throw new Error(`❌ Error sending verification email: ${error.message}`);
  }
};


export const sendWelcomeEmail = async (email, fullName) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Welcome to Connectify, ${fullName}!</h2>
        <p>We're excited to have you onboard. Let's connect and grow together.</p>
        <p>🚀 Start exploring your dashboard now!</p>
        <p>— Team Connectify</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Connectify <onboarding@resend.dev>", // make sure this is verified in Resend
      to: [email],
      subject: "Welcome to Connectify 🎉",
      html: htmlContent,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log("✅ Welcome email sent successfully:", data);
  } catch (error) {
    throw new Error(`❌ Error sending welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #2196F3; text-align: center;">Reset Your Password 🔐</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your Connectify account.</p>
        <p>Please click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetURL}" style="background-color: #2196F3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #555;">${resetURL}</p>
        <p>This link will expire in 1 hour.</p>
        <p style="margin-top: 40px;">Stay secure,<br/>The Connectify Team 🚀</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Connectify <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password",
      html: htmlContent,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log("✅ Password reset email sent:", data);
  } catch (error) {
    throw new Error(`❌ Error sending password reset email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Password Reset Successful ✅</h2>
        <p>Hello,</p>
        <p>Your password has been successfully updated for your Connectify account.</p>
        <p>If you did not perform this action, please contact our support team immediately.</p>
        <p style="margin-top: 40px;">Stay safe,<br/>The Connectify Team 🚀</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Connectify <onboarding@resend.dev>",
      to: [email],
      subject: "Password Reset Successful",
      html: htmlContent,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log("✅ Password reset success email sent:", data);
  } catch (error) {
    throw new Error(`❌ Error sending password reset email: ${error.message}`);
  }
};
