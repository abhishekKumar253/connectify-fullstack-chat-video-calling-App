import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { resend } from "./resend.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );

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
