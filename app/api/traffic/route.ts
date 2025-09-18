import { NextResponse } from "next/server"

export async function GET() {
  // Mock traffic and parking data
  const mockData = {
    timestamp: new Date().toISOString(),
    parking: {
      zones: [
        {
          id: "A",
          name: "Zone A - Main Entrance",
          total: 200,
          occupied: Math.floor(Math.random() * 100) + 40,
          distance: "0.2 km",
          status: "available",
        },
        {
          id: "B",
          name: "Zone B - North Gate",
          total: 150,
          occupied: Math.floor(Math.random() * 80) + 100,
          distance: "0.5 km",
          status: "limited",
        },
        {
          id: "C",
          name: "Zone C - South Gate",
          total: 180,
          occupied: Math.floor(Math.random() * 100) + 80,
          distance: "0.3 km",
          status: "available",
        },
        {
          id: "D",
          name: "Zone D - VIP Area",
          total: 50,
          occupied: Math.floor(Math.random() * 20) + 30,
          distance: "0.1 km",
          status: "limited",
        },
      ],
      totalAvailable: 0, // Will be calculated
    },
    shuttle: {
      routes: [
        {
          id: 1,
          name: "Main Route",
          from: "Parking Zone A",
          to: "Temple Entrance",
          nextArrival: Math.floor(Math.random() * 10) + 3,
          frequency: 10,
          status: "active",
        },
        {
          id: 2,
          name: "North Route",
          from: "Parking Zone B",
          to: "Temple Entrance",
          nextArrival: Math.floor(Math.random() * 15) + 5,
          frequency: 15,
          status: "active",
        },
        {
          id: 3,
          name: "South Route",
          from: "Parking Zone C",
          to: "Temple Entrance",
          nextArrival: Math.floor(Math.random() * 12) + 4,
          frequency: 12,
          status: "active",
        },
        {
          id: 4,
          name: "VIP Route",
          from: "Parking Zone D",
          to: "VIP Entrance",
          nextArrival: Math.floor(Math.random() * 8) + 2,
          frequency: 8,
          status: Math.random() > 0.7 ? "maintenance" : "active",
        },
      ],
    },
    traffic: {
      conditions: [
        {
          location: "Highway 51 - Temple Road Junction",
          status: ["Heavy Traffic", "Moderate Traffic", "Light Traffic"][Math.floor(Math.random() * 3)],
          severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
          lastUpdated: new Date(Date.now() - Math.random() * 10 * 60 * 1000).toISOString(),
        },
        {
          location: "Main Temple Road",
          status: ["Moderate Traffic", "Light Traffic"][Math.floor(Math.random() * 2)],
          severity: ["medium", "low"][Math.floor(Math.random() * 2)],
          lastUpdated: new Date(Date.now() - Math.random() * 15 * 60 * 1000).toISOString(),
        },
        {
          location: "Parking Zone B Access Road",
          status: "Clear",
          severity: "low",
          lastUpdated: new Date(Date.now() - Math.random() * 5 * 60 * 1000).toISOString(),
        },
        {
          location: "South Gate Approach",
          status: "Light Traffic",
          severity: "low",
          lastUpdated: new Date(Date.now() - Math.random() * 8 * 60 * 1000).toISOString(),
        },
      ],
    },
  }

  // Calculate total available parking
  mockData.parking.totalAvailable = mockData.parking.zones.reduce(
    (total, zone) => total + (zone.total - zone.occupied),
    0,
  )

  console.log("GET /api/traffic - Mock traffic and parking data retrieved")

  return NextResponse.json(mockData)
}
