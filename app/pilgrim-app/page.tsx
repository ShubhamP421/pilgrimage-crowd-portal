"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Navigation, Accessibility, Globe, Bell, QrCode } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
]

const templeTimings = [
  {
    temple: "Somnath Temple",
    timings: [
      { type: "Morning Aarti", time: "6:00 AM - 7:00 AM" },
      { type: "Darshan", time: "7:00 AM - 12:00 PM" },
      { type: "Evening Aarti", time: "7:00 PM - 8:00 PM" },
      { type: "Night Darshan", time: "8:00 PM - 10:00 PM" },
    ],
  },
  {
    temple: "Dwarka Temple",
    timings: [
      { type: "Mangla Aarti", time: "5:30 AM - 6:30 AM" },
      { type: "Darshan", time: "6:30 AM - 1:00 PM" },
      { type: "Sandhya Aarti", time: "6:30 PM - 7:30 PM" },
      { type: "Shayan Aarti", time: "9:30 PM - 10:00 PM" },
    ],
  },
]

const accessibilityFeatures = [
  { feature: "Wheelchair Access", available: true, description: "Ramps and accessible pathways" },
  { feature: "Audio Guidance", available: true, description: "Voice navigation for visually impaired" },
  { feature: "Sign Language", available: false, description: "Coming soon" },
  { feature: "Braille Signage", available: true, description: "Available at main entrances" },
  { feature: "Priority Queues", available: true, description: "Fast-track for elderly and disabled" },
]

const routeOptions = [
  {
    id: 1,
    name: "Scenic Route",
    distance: "12.5 km",
    duration: "25 min",
    description: "Beautiful coastal views",
    traffic: "Light",
  },
  {
    id: 2,
    name: "Fastest Route",
    distance: "8.2 km",
    duration: "18 min",
    description: "Direct highway route",
    traffic: "Moderate",
  },
  {
    id: 3,
    name: "Avoid Tolls",
    distance: "15.1 km",
    duration: "32 min",
    description: "No toll roads",
    traffic: "Light",
  },
]

export default function PilgrimApp() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your queue position: #15 (Est. 20 min)", type: "queue", time: "2 min ago" },
    { id: 2, message: "Evening Aarti starts in 30 minutes", type: "timing", time: "28 min ago" },
    { id: 3, message: "Parking available at Zone A", type: "parking", time: "1 hour ago" },
  ])

  const getLanguageContent = (key: string) => {
    const content = {
      en: {
        title: "Pilgrim App (B2C)",
        subtitle: "Your spiritual journey companion",
        queueUpdates: "Queue Updates",
        templeTimings: "Temple Timings",
        routeGuidance: "Route Guidance",
        accessibility: "Accessibility",
      },
      hi: {
        title: "तीर्थयात्री ऐप (B2C)",
        subtitle: "आपकी आध्यात्मिक यात्रा का साथी",
        queueUpdates: "कतार अपडेट",
        templeTimings: "मंदिर समय",
        routeGuidance: "मार्ग मार्गदर्शन",
        accessibility: "पहुंच",
      },
      gu: {
        title: "તીર્થયાત્રી એપ (B2C)",
        subtitle: "તમારી આધ્યાત્મિક યાત્રાનો સાથી",
        queueUpdates: "કતાર અપડેટ્સ",
        templeTimings: "મંદિર સમય",
        routeGuidance: "માર્ગ માર્ગદર્શન",
        accessibility: "સુલભતા",
      },
    }
    return (
      content[selectedLanguage as keyof typeof content]?.[key as keyof (typeof content)["en"]] ||
      content.en[key as keyof (typeof content)["en"]]
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{getLanguageContent("title")}</h1>
            <p className="text-muted-foreground">{getLanguageContent("subtitle")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center space-x-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="queue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="queue">{getLanguageContent("queueUpdates")}</TabsTrigger>
            <TabsTrigger value="timings">{getLanguageContent("templeTimings")}</TabsTrigger>
            <TabsTrigger value="routes">{getLanguageContent("routeGuidance")}</TabsTrigger>
            <TabsTrigger value="accessibility">{getLanguageContent("accessibility")}</TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="mr-2 h-5 w-5" />
                  Live Queue Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications
                    .filter((n) => n.type === "queue")
                    .map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{notification.message}</p>
                            <p className="text-sm text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    ))}
                  <div className="text-center p-6 border-2 border-dashed rounded-lg">
                    <QrCode className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No active queue bookings</p>
                    <Button className="mt-2 bg-transparent" variant="outline">
                      Book Queue Ticket
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timings" className="space-y-4">
            {templeTimings.map((temple) => (
              <Card key={temple.temple}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    {temple.temple}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {temple.timings.map((timing, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{timing.type}</span>
                        <Badge variant="outline">{timing.time}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="routes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Navigation className="mr-2 h-5 w-5" />
                  Route Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routeOptions.map((route) => (
                    <Card key={route.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{route.name}</h3>
                            <p className="text-sm text-muted-foreground">{route.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {route.distance}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {route.duration}
                              </span>
                              <Badge variant={route.traffic === "Light" ? "secondary" : "default"}>
                                {route.traffic} Traffic
                              </Badge>
                            </div>
                          </div>
                          <Button>Navigate</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Accessibility className="mr-2 h-5 w-5" />
                  Accessibility Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accessibilityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{feature.feature}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                      <Badge variant={feature.available ? "default" : "secondary"}>
                        {feature.available ? "Available" : "Coming Soon"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Need special assistance during your visit? Our volunteers are here to help.
                  </p>
                  <Button className="w-full">Request Volunteer Assistance</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
