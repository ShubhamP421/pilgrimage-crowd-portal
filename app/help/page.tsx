"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, Phone, Mail, Send, HelpCircle, Search } from "lucide-react"

const faqData = [
  {
    id: "1",
    question: "How do I book a virtual queue ticket?",
    answer:
      "To book a virtual queue ticket, go to the Smart Queues page, select your preferred temple and time slot, fill in your details, and click 'Book Ticket'. You'll receive a QR code that you can use for quick entry.",
  },
  {
    id: "2",
    question: "What should I do if I lose my queue ticket?",
    answer:
      "If you lose your queue ticket, contact our support team immediately with your booking details (name and phone number). We can help you retrieve your ticket information and QR code.",
  },
  {
    id: "3",
    question: "How accurate are the crowd level predictions?",
    answer:
      "Our crowd level predictions are based on historical data, current bookings, and real-time monitoring. They are typically 85-90% accurate, but actual conditions may vary due to weather, special events, or unforeseen circumstances.",
  },
  {
    id: "4",
    question: "Can I cancel or reschedule my queue booking?",
    answer:
      "Yes, you can cancel or reschedule your booking up to 2 hours before your scheduled time slot. Go to the Smart Queues page and use your booking ID to make changes.",
  },
  {
    id: "5",
    question: "What happens during an emergency alert?",
    answer:
      "During an emergency alert, follow the instructions from temple staff and volunteers. Use designated emergency exits, stay calm, and avoid crowded areas. Emergency services will be dispatched immediately.",
  },
  {
    id: "6",
    question: "How do I report a technical issue with the app?",
    answer:
      "You can report technical issues through our live chat support, email us at support@smartpilgrimage.com, or call our technical support hotline. Please include details about the issue and your device information.",
  },
]

const supportOptions = [
  {
    id: 1,
    title: "Live Chat Support",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    action: "chat",
    availability: "24/7",
    responseTime: "< 2 minutes",
  },
  {
    id: 2,
    title: "Phone Support",
    description: "Speak directly with our experts",
    icon: Phone,
    action: "phone",
    availability: "9 AM - 9 PM",
    responseTime: "Immediate",
  },
  {
    id: 3,
    title: "Email Support",
    description: "Send us detailed questions or feedback",
    icon: Mail,
    action: "email",
    availability: "24/7",
    responseTime: "< 4 hours",
  },
]

export default function HelpSupport() {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "support", message: "Hello! How can I help you today?", time: "Just now" },
  ])
  const [chatInput, setChatInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { toast } = useToast()

  const handleSupportAction = (action: string) => {
    switch (action) {
      case "chat":
        setIsChatOpen(true)
        break
      case "phone":
        window.location.href = "tel:+912876123456"
        toast({
          title: "Calling Support",
          description: "Connecting you to our phone support...",
        })
        break
      case "email":
        window.location.href = "mailto:support@smartpilgrimage.com"
        break
    }
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const newMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      message: chatInput,
      time: "Just now",
    }

    setChatMessages((prev) => [...prev, newMessage])
    setChatInput("")

    // Simulate support response
    setTimeout(() => {
      const supportResponse = {
        id: chatMessages.length + 2,
        sender: "support",
        message:
          "Thank you for your message. Let me help you with that. Can you provide more details about your issue?",
        time: "Just now",
      }
      setChatMessages((prev) => [...prev, supportResponse])
    }, 1000)
  }

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to your questions or get in touch with our support team
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportOptions.map((option) => {
            const Icon = option.icon
            return (
              <Card key={option.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{option.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Available:</span>
                      <Badge variant="outline">{option.availability}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Response:</span>
                      <Badge variant="secondary">{option.responseTime}</Badge>
                    </div>
                  </div>
                  <Button onClick={() => handleSupportAction(option.action)} className="w-full">
                    Get Help
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFAQs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No FAQs found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Chat Interface */}
        {isChatOpen && (
          <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Live Chat Support</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-48 overflow-y-auto space-y-2 border rounded p-2">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-2 rounded-lg text-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p>{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
