import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle both old format (formData) and new format (direct fields)
    const appointmentData = body.formData || body;
    const { name, phone, email, department, date, time, message } = appointmentData;

    // Validate required fields
    if (!name || !phone || !department || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Resend API Configuration
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const ADMIN_EMAIL = "saharamedicoserajgarh@gmail.com";

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Prepare email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #248e97 0%, #1e5e93 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; color: #248e97; margin-bottom: 10px; font-size: 16px; border-bottom: 2px solid #248e97; padding-bottom: 5px; }
            .info-row { margin: 8px 0; padding: 8px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #555; }
            .value { color: #333; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🏥 New Appointment Request</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Received from website</p>
            </div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">📋 PATIENT INFORMATION</div>
                <div class="info-row">
                  <span class="label">Name:</span> <span class="value">${name}</span>
                </div>
                <div class="info-row">
                  <span class="label">Phone:</span> <span class="value">${phone}</span>
                </div>
                <div class="info-row">
                  <span class="label">Email:</span> <span class="value">${email || "Not provided"}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">🏥 APPOINTMENT DETAILS</div>
                <div class="info-row">
                  <span class="label">Department:</span> <span class="value">${department}</span>
                </div>
                <div class="info-row">
                  <span class="label">Preferred Date:</span> <span class="value">${date}</span>
                </div>
                <div class="info-row">
                  <span class="label">Preferred Time:</span> <span class="value">${time}</span>
                </div>
              </div>

              ${message ? `
                <div class="section">
                  <div class="section-title">💬 ADDITIONAL MESSAGE</div>
                  <div class="info-row">
                    <p style="margin: 0;">${message}</p>
                  </div>
                </div>
              ` : ''}

              <div class="section" style="background: #fff3cd; padding: 15px; border-radius: 4px; border-left: 4px solid #f97316;">
                <strong>⚠️ Action Required:</strong> Please contact the patient at <strong>${phone}</strong> to confirm the appointment.
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0;">Sahara Multispeciality Hospital | Serajgarh</p>
              <p style="margin: 5px 0 0 0; opacity: 0.8;">This is an automated message from your hospital website</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sahara Hospital <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `New Appointment Request - ${name}`,
        html: emailHtml,
        reply_to: email || undefined,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", result);
      return NextResponse.json(
        { success: false, error: result.message || "Failed to send email" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment request sent successfully",
      emailId: result.id,
    });

  } catch (error) {
    console.error("Error sending appointment email:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
