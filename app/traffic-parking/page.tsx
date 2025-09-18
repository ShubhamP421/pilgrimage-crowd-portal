"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Car, MapPin, Clock, Bus, Navigation, RefreshCw } from "lucide-react"

const parkingZones = [
  { id: "A", name: "Zone A - Main Entrance", total: 200, occupied: 45, distance: "0.2 km" },
  { id: "B", name: "Zone B - North Gate", total: 150, occupied: 120, distance: "0.5 km" },
  { id: "C", name: "Zone C - South Gate", total: 180, occupied: 95, distance: "0.3 km" },
  { id: "D", name: "Zone D - VIP Area", total: 50, occupied: 35, distance: "0.1 km" },
]

const shuttleRoutes = [
  {
    id: 1,
    name: "Main Route",
    from: "Parking Zone A",
    to: "Temple Entrance",
    nextArrival: "5 min",
    frequency: "Every 10 min",
    status: "active",
  },
  {
    id: 2,
    name: "North Route",
    from: "Parking Zone B",
    to: "Temple Entrance",
    nextArrival: "12 min",
    frequency: "Every 15 min",
    status: "active",
  },
  {
    id: 3,
    name: "South Route",
    from: "Parking Zone C",
    to: "Temple Entrance",
    nextArrival: "8 min",
    frequency: "Every 12 min",
    status: "active",
  },
  {
    id: 4,
    name: "VIP Route",
    from: "Parking Zone D",
    to: "VIP Entrance",
    nextArrival: "3 min",
    frequency: "Every 8 min",
    status: "maintenance",
  },
]

const trafficUpdates = [
  {
    id: 1,
    location: "Highway 51 - Temple Road Junction",
    status: "Heavy Traffic",
    severity: "high",
    time: "2 min ago",
  },
  { id: 2, location: "Main Temple Road", status: "Moderate Traffic", severity: "medium", time: "5 min ago" },
  { id: 3, location: "Parking Zone B Access Road", status: "Clear", severity: "low", time: "1 min ago" },
  { id: 4, location: "South Gate Approach", status: "Light Traffic", severity: "low", time: "3 min ago" },
]

const getAvailabilityColor = (percentage: number) => {
  if (percentage >= 70) return "text-green-600 dark:text-green-400"
  if (percentage >= 30) return "text-yellow-600 dark:text-yellow-400"
  return "text-red-600 dark:text-red-400"
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
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

export default function TrafficParking() {
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleRefresh = () => {
    setLastUpdated(new Date())
    // In a real app, this would fetch fresh data
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Traffic & Parking</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Navigation className="mr-2 h-5 w-5" />
              Live Traffic Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Interactive Traffic Map</p>
                <p className="text-sm text-muted-foreground">Real-time traffic conditions and route guidance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parking Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="mr-2 h-5 w-5" />
              Parking Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {parkingZones.map((zone) => {
                const available = zone.total - zone.occupied
                const availabilityPercentage = (available / zone.total) * 100
                const occupancyPercentage = (zone.occupied / zone.total) * 100

                return (
                  <Card key={zone.id} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Zone {zone.id}</CardTitle>
                        <Badge variant="outline">{zone.distance}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{zone.name}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Available</span>
                        <span className={`font-bold text-lg ${getAvailabilityColor(availabilityPercentage)}`}>
                          {available}
                        </span>
                      </div>
                      <Progress value={occupancyPercentage} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Occupied: {zone.occupied}</span>
                        <span>Total: {zone.total}</span>
                      </div>
                      <Button
                        className="w-full"
                        variant={available > 0 ? "default" : "secondary"}
                        disabled={available === 0}
                      >
                        {available > 0 ? "Navigate" : "Full"}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Shuttle Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bus className="mr-2 h-5 w-5" />
              Shuttle Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shuttleRoutes.map((route) => (
                <Card key={route.id} className="border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                      <Badge variant={route.status === "active" ? "default" : "destructive"}>{route.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">From:</span>
                        <span>{route.from}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">To:</span>
                        <span>{route.to}</span>
                      </div>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Next Arrival</span>
                        </div>
                        <Badge variant="outline" className="font-bold">
                          {route.nextArrival}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Frequency:</span>
                        <span>{route.frequency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Live Traffic Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trafficUpdates.map((update) => (
                <div key={update.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{update.location}</h4>
                    <p className="text-sm text-muted-foreground">{update.time}</p>
                  </div>
                  <Badge variant={getSeverityColor(update.severity)}>{update.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
