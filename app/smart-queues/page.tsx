"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { QrCode, Clock, Users, MapPin, Ticket } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const temples = [
  { id: "somnath", name: "Somnath Temple", waitTime: 45, queueLength: 120 },
  { id: "dwarka", name: "Dwarka Temple", waitTime: 25, queueLength: 80 },
  { id: "ambaji", name: "Ambaji Temple", waitTime: 15, queueLength: 45 },
  { id: "pavagadh", name: "Pavagadh Temple", waitTime: 35, queueLength: 95 },
]

const timeSlots = [
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
]

interface QueueTicket {
  id: string
  temple: string
  timeSlot: string
  position: number
  estimatedWait: number
  qrCode: string
}

export default function SmartQueues() {
  const [selectedTemple, setSelectedTemple] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const [visitorName, setVisitorName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [tickets, setTickets] = useState<QueueTicket[]>([])
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { toast } = useToast()

  const handleBookTicket = () => {
    if (!selectedTemple || !selectedTimeSlot || !visitorName || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const temple = temples.find((t) => t.id === selectedTemple)
    if (!temple) return

    const newTicket: QueueTicket = {
      id: `TKT-${Date.now()}`,
      temple: temple.name,
      timeSlot: selectedTimeSlot,
      position: Math.floor(Math.random() * 50) + 1,
      estimatedWait: Math.floor(Math.random() * 30) + 10,
      qrCode: `QR-${Date.now()}`,
    }

    setTickets((prev) => [...prev, newTicket])
    setIsBookingOpen(false)

    // Reset form
    setSelectedTemple("")
    setSelectedTimeSlot("")
    setVisitorName("")
    setPhoneNumber("")

    toast({
      title: "Ticket Booked Successfully!",
      description: `Your queue position is #${newTicket.position}`,
    })
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Smart Queue System</h1>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button>
                <Ticket className="mr-2 h-4 w-4" />
                Book Queue Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Book Virtual Queue Ticket</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="temple">Select Temple</Label>
                  <Select value={selectedTemple} onValueChange={setSelectedTemple}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a temple" />
                    </SelectTrigger>
                    <SelectContent>
                      {temples.map((temple) => (
                        <SelectItem key={temple.id} value={temple.id}>
                          {temple.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeSlot">Preferred Time Slot</Label>
                  <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Visitor Name</Label>
                  <Input
                    id="name"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                <Button onClick={handleBookTicket} className="w-full">
                  Book Ticket
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Current Queue Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {temples.map((temple) => (
            <Card key={temple.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {temple.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Wait Time</span>
                  </div>
                  <Badge variant="outline">{temple.waitTime} min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Queue Length</span>
                  </div>
                  <Badge variant="secondary">{temple.queueLength} people</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Your Tickets */}
        {tickets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Queue Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="border-2 border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{ticket.temple}</CardTitle>
                        <Badge variant="outline">{ticket.id}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Time Slot</span>
                        <span className="font-medium">{ticket.timeSlot}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Your Position</span>
                        <Badge variant="default" className="text-lg px-3 py-1">
                          #{ticket.position}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Est. Wait Time</span>
                        <span className="font-medium">{ticket.estimatedWait} min</span>
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex items-center justify-center space-x-2 p-4 bg-muted rounded-lg">
                          <QrCode className="h-8 w-8" />
                          <div className="text-center">
                            <p className="text-sm font-medium">QR Code</p>
                            <p className="text-xs text-muted-foreground">{ticket.qrCode}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Queue Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How Virtual Queue Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold">Book Your Slot</h3>
                <p className="text-sm text-muted-foreground">
                  Select your preferred temple and time slot to book a virtual queue ticket
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold">Get QR Code</h3>
                <p className="text-sm text-muted-foreground">Receive your unique QR code and queue position number</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">Visit at Your Time</h3>
                <p className="text-sm text-muted-foreground">
                  Arrive during your time slot and scan the QR code for quick entry
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
