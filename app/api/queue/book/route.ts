import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { temple, timeSlot, visitorName, phoneNumber } = body

    // Validate required fields
    if (!temple || !timeSlot || !visitorName || !phoneNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate mock booking data
    const bookingId = `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const qrCode = `QR-${Date.now()}`
    const position = Math.floor(Math.random() * 50) + 1
    const estimatedWait = Math.floor(Math.random() * 30) + 10

    const booking = {
      bookingId,
      temple,
      timeSlot,
      visitorName,
      phoneNumber,
      qrCode,
      position,
      estimatedWait,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }

    console.log("POST /api/queue/book - Queue booking created:", booking)

    return NextResponse.json({
      success: true,
      booking,
    })
  } catch (error) {
    console.error("Error booking queue:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
