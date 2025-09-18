"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Users, TrendingUp, AlertTriangle, Clock } from "lucide-react"

const footfallData = [
  { time: "6 AM", predicted: 200, actual: 180 },
  { time: "8 AM", predicted: 800, actual: 750 },
  { time: "10 AM", predicted: 1500, actual: 1600 },
  { time: "12 PM", predicted: 2200, actual: 2100 },
  { time: "2 PM", predicted: 1800, actual: 1900 },
  { time: "4 PM", predicted: 2500, actual: 2400 },
  { time: "6 PM", predicted: 3000, actual: 2800 },
  { time: "8 PM", predicted: 1200, actual: 1300 },
]

const templeData = [
  { name: "Somnath", current: 2500, capacity: 3000, level: "high" },
  { name: "Dwarka", current: 1200, capacity: 2000, level: "medium" },
  { name: "Ambaji", current: 800, capacity: 1500, level: "low" },
  { name: "Pavagadh", current: 1500, capacity: 2500, level: "medium" },
]

const heatmapData = [
  { zone: "Main Entrance", density: 85, status: "high" },
  { zone: "Prayer Hall", density: 92, status: "high" },
  { zone: "Courtyard", density: 65, status: "medium" },
  { zone: "Exit Gate", density: 45, status: "low" },
  { zone: "Parking Area", density: 30, status: "low" },
  { zone: "Food Court", density: 70, status: "medium" },
]

const getCrowdColor = (level: string) => {
  switch (level) {
    case "high":
      return "destructive"
    case "medium":
      return "default"
    case "low":
      return "secondary"
    default:
      return "secondary"
  }
}

const getDensityColor = (density: number) => {
  if (density >= 80) return "bg-red-500"
  if (density >= 60) return "bg-yellow-500"
  return "bg-green-500"
}

export default function CrowdDashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Crowd Dashboard</h1>
          <Badge variant="outline" className="text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">6,000</p>
                  <p className="text-muted-foreground">Current Visitors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">+12%</p>
                  <p className="text-muted-foreground">vs Predicted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-muted-foreground">High Density Zones</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">18 min</p>
                  <p className="text-muted-foreground">Peak Wait Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Footfall Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Predicted vs Actual Footfall</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={footfallData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="predicted" stroke="#FF7D29" strokeWidth={2} name="Predicted" />
                  <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Temple Capacity */}
          <Card>
            <CardHeader>
              <CardTitle>Temple Capacity Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templeData.map((temple) => (
                  <div key={temple.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{temple.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getCrowdColor(temple.level)}>
                          {temple.current}/{temple.capacity}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(temple.current / temple.capacity) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Density Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Zone Density Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {heatmapData.map((zone) => (
                <div key={zone.zone} className="p-4 rounded-lg border bg-card text-center space-y-2">
                  <div className={`w-full h-20 rounded ${getDensityColor(zone.density)} opacity-80`} />
                  <h3 className="font-medium text-sm">{zone.zone}</h3>
                  <p className="text-2xl font-bold">{zone.density}%</p>
                  <Badge variant={getCrowdColor(zone.status)} className="text-xs">
                    {zone.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
