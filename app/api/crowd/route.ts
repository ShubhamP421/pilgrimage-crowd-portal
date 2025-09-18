import { NextResponse } from "next/server"

export async function GET() {
  // Mock crowd data
  const mockData = {
    timestamp: new Date().toISOString(),
    temples: [
      {
        id: "somnath",
        name: "Somnath Temple",
        currentFootfall: Math.floor(Math.random() * 1000) + 2000,
        predictedFootfall: Math.floor(Math.random() * 1000) + 2200,
        capacity: 3000,
        crowdLevel: "high",
        zones: [
          { name: "Main Entrance", density: Math.floor(Math.random() * 30) + 70 },
          { name: "Prayer Hall", density: Math.floor(Math.random() * 20) + 80 },
          { name: "Courtyard", density: Math.floor(Math.random() * 40) + 40 },
        ],
      },
      {
        id: "dwarka",
        name: "Dwarka Temple",
        currentFootfall: Math.floor(Math.random() * 800) + 1000,
        predictedFootfall: Math.floor(Math.random() * 800) + 1100,
        capacity: 2000,
        crowdLevel: "medium",
        zones: [
          { name: "Main Entrance", density: Math.floor(Math.random() * 30) + 50 },
          { name: "Prayer Hall", density: Math.floor(Math.random() * 20) + 60 },
          { name: "Courtyard", density: Math.floor(Math.random() * 40) + 30 },
        ],
      },
      {
        id: "ambaji",
        name: "Ambaji Temple",
        currentFootfall: Math.floor(Math.random() * 500) + 600,
        predictedFootfall: Math.floor(Math.random() * 500) + 700,
        capacity: 1500,
        crowdLevel: "low",
        zones: [
          { name: "Main Entrance", density: Math.floor(Math.random() * 30) + 30 },
          { name: "Prayer Hall", density: Math.floor(Math.random() * 20) + 40 },
          { name: "Courtyard", density: Math.floor(Math.random() * 40) + 20 },
        ],
      },
      {
        id: "pavagadh",
        name: "Pavagadh Temple",
        currentFootfall: Math.floor(Math.random() * 700) + 1200,
        predictedFootfall: Math.floor(Math.random() * 700) + 1300,
        capacity: 2500,
        crowdLevel: "medium",
        zones: [
          { name: "Main Entrance", density: Math.floor(Math.random() * 30) + 60 },
          { name: "Prayer Hall", density: Math.floor(Math.random() * 20) + 70 },
          { name: "Courtyard", density: Math.floor(Math.random() * 40) + 35 },
        ],
      },
    ],
    totalVisitors: Math.floor(Math.random() * 2000) + 5000,
    averageWaitTime: Math.floor(Math.random() * 20) + 15,
    peakHours: ["14:00", "15:00", "16:00", "17:00", "18:00"],
  }

  console.log("GET /api/crowd - Mock crowd data retrieved")

  return NextResponse.json(mockData)
}
