"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin, Users, Clock } from "lucide-react"
import { useState } from "react"

const temples = [
  {
    id: 1,
    name: "Somnath Temple",
    location: "Somnath, Gujarat",
    crowdLevel: "high",
    currentVisitors: 2500,
    image: "/Somnath-temple.jpg",
  },
  {
    id: 2,
    name: "Dwarka Temple",
    location: "Dwarka, Gujarat",
    crowdLevel: "medium",
    currentVisitors: 1200,
    image: "/dwarkadhish -temple.jpeg",
  },
  {
    id: 3,
    name: "Ambaji Temple",
    location: "Ambaji, Gujarat",
    crowdLevel: "low",
    currentVisitors: 800,
    image: "/Ambaji-Temple.jpg",
  },
  {
    id: 4,
    name: "Pavagadh Temple",
    location: "Pavagadh, Gujarat",
    crowdLevel: "medium",
    currentVisitors: 1500,
    image: "/Pavagadh-Temple.webp",
  },
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

const getCrowdText = (level: string) => {
  switch (level) {
    case "high":
      return "High Crowd"
    case "medium":
      return "Moderate"
    case "low":
      return "Low Crowd"
    default:
      return "Unknown"
  }
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % temples.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + temples.length) % temples.length)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome to Smart Pilgrimage Portal</h1>
          <p className="text-muted-foreground text-lg">Enhancing safety, mobility, and your spiritual journey</p>
        </div>

        {/* Temple Carousel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sacred Destinations</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={prevSlide}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextSlide}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {temples.map((temple) => (
                  <div key={temple.id} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">{temple.name}</h3>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{temple.location}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={getCrowdColor(temple.crowdLevel)}>{getCrowdText(temple.crowdLevel)}</Badge>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{temple.currentVisitors.toLocaleString()} visitors</span>
                          </div>
                        </div>
                        <Button className="w-full sm:w-auto">View Details</Button>
                      </div>
                      <div className="order-first md:order-last">
                        <img
                          src={temple.image || "/placeholder.svg"}
                          alt={temple.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {temples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">6,000</p>
                  <p className="text-muted-foreground">Total Visitors Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15 min</p>
                  <p className="text-muted-foreground">Avg. Wait Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-muted-foreground">Parking Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
