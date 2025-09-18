import { NextResponse } from "next/server"

export async function GET() {
  // Mock admin dashboard data
  const mockData = {
    timestamp: new Date().toISOString(),
    stats: {
      totalVisitorsToday: Math.floor(Math.random() * 5000) + 10000,
      averageWaitTime: Math.floor(Math.random() * 20) + 15,
      activeIncidents: Math.floor(Math.random() * 5) + 1,
      staffDeployed: Math.floor(Math.random() * 20) + 40,
      peakHour: "2:00 PM - 6:00 PM",
      busiestTemple: "Somnath Temple",
      averageVisitDuration: 45,
      satisfactionRate: 94.2,
    },
    incidents: [
      {
        id: "INC-001",
        type: "Medical Emergency",
        location: "Somnath Temple - Main Hall",
        status: "active",
        severity: "high",
        reportedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        description: "Medical assistance required for elderly pilgrim",
      },
      {
        id: "INC-002",
        type: "Crowd Surge",
        location: "Dwarka Temple - Entrance",
        status: "resolved",
        severity: "medium",
        reportedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        description: "High crowd density managed successfully",
      },
      {
        id: "INC-003",
        type: "Lost Child",
        location: "Ambaji Temple - Parking Area",
        status: "resolved",
        severity: "medium",
        reportedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        description: "Child reunited with family",
      },
    ],
    staffDeployment: {
      security: { active: 15, total: 20 },
      crowdManagers: { active: 12, total: 15 },
      medical: { active: 8, total: 10 },
      volunteers: { active: 10, total: 15 },
    },
    waitTimes: [
      { temple: "Somnath Temple", waitTime: Math.floor(Math.random() * 30) + 30 },
      { temple: "Dwarka Temple", waitTime: Math.floor(Math.random() * 20) + 20 },
      { temple: "Ambaji Temple", waitTime: Math.floor(Math.random() * 15) + 10 },
      { temple: "Pavagadh Temple", waitTime: Math.floor(Math.random() * 25) + 25 },
    ],
    analytics: {
      visitorTrends: [
        { hour: "6 AM", visitors: Math.floor(Math.random() * 200) + 100 },
        { hour: "8 AM", visitors: Math.floor(Math.random() * 500) + 600 },
        { hour: "10 AM", visitors: Math.floor(Math.random() * 800) + 1200 },
        { hour: "12 PM", visitors: Math.floor(Math.random() * 1000) + 1800 },
        { hour: "2 PM", visitors: Math.floor(Math.random() * 1200) + 2200 },
        { hour: "4 PM", visitors: Math.floor(Math.random() * 1000) + 2000 },
        { hour: "6 PM", visitors: Math.floor(Math.random() * 800) + 1500 },
        { hour: "8 PM", visitors: Math.floor(Math.random() * 600) + 800 },
      ],
    },
  }

  console.log("GET /api/admin/dashboard - Admin dashboard data retrieved")

  return NextResponse.json(mockData)
}
