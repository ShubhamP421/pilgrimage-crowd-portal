import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate contact submission
    const submissionId = `CNT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const submission = {
      submissionId,
      name,
      email,
      subject,
      message,
      status: "received",
      priority: "normal",
      createdAt: new Date().toISOString(),
      estimatedResponse: "24 hours",
    }

    console.log("POST /api/contact - Contact form submitted:", submission)

    // Simulate email notification to support team
    console.log("Email notification sent to support team")
    console.log("Auto-reply sent to:", email)

    return NextResponse.json({
      success: true,
      submission,
      message: "Your message has been received. We will respond within 24 hours.",
    })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
