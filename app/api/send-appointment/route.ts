import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, formData } = body;

    // Create formatted email content
    const emailContent = `
New Appointment Request from Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PATIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPOINTMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Department: ${formData.department}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}

${formData.message ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTION REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please contact the patient at ${formData.phone} to confirm the appointment.

This is an automated message from the hospital website.
    `.trim();

    // In a production environment, you would use a service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES
    
    // For now, we'll return success and let the frontend handle mailto fallback
    console.log("Appointment request received:", {
      to,
      subject,
      content: emailContent,
      formData
    });

    // Simulate email sending
    return NextResponse.json({ 
      success: true, 
      message: "Appointment request received",
      fallbackRequired: true // Indicates frontend should use mailto
    });
  } catch (error) {
    console.error("Error processing appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process appointment" },
      { status: 500 }
    );
  }
}
