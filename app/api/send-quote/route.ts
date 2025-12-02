import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, solution, details } = await request.json();

    // Validate required fields
    if (!name || !email || !solution || !details) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content for admin
    const adminMailOptions = {
      from:
        process.env.EMAIL_FROM || `"Quote Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // Admin email from environment variables
      subject: `New Quote Request: ${solution}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">
            New Quote Request Received
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0070f3; margin-top: 0;">Request Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Company:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${company || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Solution:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${solution}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Project Details:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">
                  <div style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 3px; margin-top: 5px;">
                    ${details}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Submitted At:</strong></td>
                <td style="padding: 8px 0;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e8f4ff; border-radius: 5px;">
            <p style="margin: 0; color: #333;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
            </p>
          </div>
        </div>
      `,
    };

    // Optional: Send confirmation email to user
    const userMailOptions = {
      from:
        process.env.EMAIL_FROM || `"Quote Form" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for your quote request!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for your interest, ${name}!</h2>
          
          <p>We've received your quote request for <strong>${solution}</strong> and will review it shortly.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>What happens next:</strong></p>
            <ul>
              <li>Our team will review your requirements within 24 hours</li>
              <li>We'll contact you to discuss your project in detail</li>
              <li>You'll receive a customized quote based on your needs</li>
            </ul>
          </div>
          
          <p><strong>Request Summary:</strong></p>
          <ul>
            <li><strong>Solution:</strong> ${solution}</li>
            ${company ? `<li><strong>Company:</strong> ${company}</li>` : ""}
          </ul>
          
          <p>If you have any immediate questions, feel free to reply to this email.</p>
          
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Best regards,<br>
            Your Company Team
          </p>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { message: "Quote request sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send quote request" },
      { status: 500 },
    );
  }
}
