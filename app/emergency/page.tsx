"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Phone, Shield, Heart, Users, Clock, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const emergencyContacts = [
  {
    id: 1,
    type: "Police",
    number: "100",
    icon: Shield,
    color: "bg-blue-500",
    description: "For security emergencies and law enforcement",
  },
  {
    id: 2,
    type: "Medical",
    number: "108",
    icon: Heart,
    color: "bg-red-500",
    description: "For medical emergencies and ambulance services",
  },
  {
    id: 3,
    type: "Volunteers",
    number: "+91-9876543210",
    icon: Users,
    color: "bg-green-500",
    description: "Temple volunteers and crowd management",
  },
]

const recentAlerts = [
  {
    id: 1,
    type: "Medical Emergency",
    location: "Somnath Temple - Main Hall",
    time: "2 minutes ago",
    status: "Active",
    severity: "high",
    description: "Medical assistance required for elderly pilgrim",
  },
  {
    id: 2,
    type: "Crowd Surge",
    location: "Dwarka Temple - Entrance",
    time: "15 minutes ago",
    status: "Resolved",
    severity: "medium",
    description: "High crowd density managed successfully",
  },
  {
    id: 3,
    type: "Lost Child",
    location: "Ambaji Temple - Parking Area",
    time: "1 hour ago",
    status: "Resolved",
    severity: "medium",
    description: "Child reunited with family",
  },
  {
    id: 4,
    type: "Traffic Incident",
    location: "Highway 51 - Temple Junction",
    time: "2 hours ago",
    status: "Resolved",
    severity: "low",
    description: "Minor vehicle breakdown cleared",
  },
]

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "destructive"
    case "Resolved":
      return "secondary"
    default:
      return "secondary"
  }
}

export default function Emergency() {
  const [isPanicDialogOpen, setIsPanicDialogOpen] = useState(false)
  const { toast } = useToast()

  const handlePanicButton = () => {
    console.log("Emergency Alert Triggered!")
    setIsPanicDialogOpen(false)
    toast({
      title: "Emergency Alert Sent!",
      description: "Emergency services have been notified. Help is on the way.",
      variant: "destructive",
    })
  }

  const handleQuickCall = (contact: (typeof emergencyContacts)[0]) => {
    console.log(`Calling ${contact.type}: ${contact.number}`)
    toast({
      title: `Calling ${contact.type}`,
      description: `Dialing ${contact.number}...`,
    })
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Emergency Services</h1>
          <Badge variant="outline" className="text-sm">
            24/7 Emergency Support
          </Badge>
        </div>

        {/* Panic Button */}
        <Card className="border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Emergency Alert</h2>
              <p className="text-muted-foreground">
                Press this button only in case of genuine emergency. This will immediately alert all emergency services.
              </p>
              <Dialog open={isPanicDialogOpen} onOpenChange={setIsPanicDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="destructive" className="text-lg px-8 py-4">
                    <AlertTriangle className="mr-2 h-6 w-6" />
                    EMERGENCY ALERT
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-red-600 dark:text-red-400">Confirm Emergency Alert</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        This will immediately notify all emergency services including police, medical, and temple
                        security. Only proceed if this is a genuine emergency.
                      </AlertDescription>
                    </Alert>
                    <div className="flex space-x-2">
                      <Button variant="destructive" onClick={handlePanicButton} className="flex-1">
                        Confirm Emergency
                      </Button>
                      <Button variant="outline" onClick={() => setIsPanicDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Quick Call Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyContacts.map((contact) => {
                const Icon = contact.icon
                return (
                  <Card key={contact.id} className="border-2 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center space-y-4">
                      <div
                        className={`w-16 h-16 ${contact.color} rounded-full flex items-center justify-center mx-auto`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{contact.type}</h3>
                        <p className="text-2xl font-mono font-bold text-primary">{contact.number}</p>
                        <p className="text-sm text-muted-foreground mt-2">{contact.description}</p>
                      </div>
                      <Button onClick={() => handleQuickCall(contact)} className="w-full" variant="outline">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Alert Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Emergency Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <Card key={alert.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{alert.type}</h4>
                          <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          <Badge variant={getStatusColor(alert.status)}>{alert.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{alert.time}</span>
                          </div>
                        </div>
                        <p className="text-sm">{alert.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Procedures */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Procedures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Medical Emergency</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Ensure the area is safe</li>
                  <li>Call medical emergency (108)</li>
                  <li>Provide first aid if trained</li>
                  <li>Clear the area for emergency services</li>
                  <li>Stay with the person until help arrives</li>
                </ol>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Crowd Emergency</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Stay calm and avoid panic</li>
                  <li>Move away from dense crowds</li>
                  <li>Follow volunteer instructions</li>
                  <li>Use designated emergency exits</li>
                  <li>Help others if safe to do so</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
