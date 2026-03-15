import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Simple email HTML template instead of React component
const createEmailHtml = (name: string, email: string, message: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white;">
          <h1 style="margin: 0 0 10px; font-size: 24px;">New Contact Form Submission</h1>
          <p style="margin: 0; opacity: 0.9;">You've received a new message from your portfolio.</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9; border-radius: 10px; margin-top: 20px;">
          <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Name</div>
            <div style="font-size: 18px; font-weight: 600; color: #333;">${name}</div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Email</div>
            <div style="font-size: 18px; font-weight: 600; color: #333;">${email}</div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; color: #666; margin-bottom: 5px;">Message</div>
            <div style="font-size: 16px; color: #333; line-height: 1.5; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>This email was sent from your portfolio contact form.</p>
        </div>
      </body>
    </html>
  `;
};

export async function POST(req: Request) {
  try {

    const body = await req.json();

    // Validate input
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const formattedErrors = validation.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return NextResponse.json(
        {
          error: "Validation failed",
          details: formattedErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, message } = validation.data;

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    // Create HTML email
    const htmlContent = createEmailHtml(name, email, message);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Contact Form <frommyportfolio@resend.dev>",
      to: ["adebajohn@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: htmlContent, // Use html instead of react
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request", details: String(error) },
      { status: 500 },
    );
  }
}
