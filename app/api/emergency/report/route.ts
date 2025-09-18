import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, location, description, severity, reportedBy } = body

    // Validate required fields
    if (!type || !location) {
      return NextResponse.json({ error: "Missing required fields: type and location" }, { status: 400 })
    }

    // Generate emergency report
    const reportId = `EMR-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const report = {
      reportId,
      type,
      location,
      description: description || "No description provided",
      severity: severity || "medium",
      reportedBy: reportedBy || "Anonymous",
      status: "active",
      createdAt: new Date().toISOString(),
      estimatedResponse: Math.floor(Math.random() * 10) + 5, // 5-15 minutes
    }

    console.log("POST /api/emergency/report - Emergency reported:", report)

    // Simulate emergency services notification
    console.log("Emergency Alert Triggered!")
    console.log("Notifying: Police, Medical, Temple Security")
    console.log("Location:", location)
    console.log("Type:", type)
    console.log("Severity:", severity)

    return NextResponse.json({
      success: true,
      report,
      message: "Emergency services have been notified",
    })
  } catch (error) {
    console.error("Error reporting emergency:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
