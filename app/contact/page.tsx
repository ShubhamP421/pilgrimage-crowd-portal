"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

const contactInfo = [
  {
    id: 1,
    title: "Main Office",
    icon: Phone,
    details: [
      { label: "Phone", value: "+91-2876-123456", action: "tel:+912876123456" },
      { label: "Toll Free", value: "1800-123-4567", action: "tel:18001234567" },
    ],
  },
  {
    id: 2,
    title: "Email Support",
    icon: Mail,
    details: [
      { label: "General Inquiries", value: "info@smartpilgrimage.com", action: "mailto:info@smartpilgrimage.com" },
      {
        label: "Technical Support",
        value: "support@smartpilgrimage.com",
        action: "mailto:support@smartpilgrimage.com",
      },
    ],
  },
  {
    id: 3,
    title: "Office Address",
    icon: MapPin,
    details: [
      { label: "Address", value: "Smart Pilgrimage Portal Pvt. Ltd.", action: null },
      { label: "", value: "Temple Management Complex", action: null },
      { label: "", value: "Somnath, Gujarat - 362268", action: null },
    ],
  },
  {
    id: 4,
    title: "Office Hours",
    icon: Clock,
    details: [
      { label: "Monday - Friday", value: "9:00 AM - 6:00 PM", action: null },
      { label: "Saturday", value: "9:00 AM - 2:00 PM", action: null },
      { label: "Sunday", value: "Closed", action: null },
    ],
  },
]

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Contact form submitted:", formData)
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleContactAction = (action: string | null) => {
    if (action) {
      if (action.startsWith("tel:")) {
        window.location.href = action
      } else if (action.startsWith("mailto:")) {
        window.location.href = action
      }
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground text-lg">Get in touch with our team for any questions or support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-5 w-5" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <Card key={info.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <div className="p-2 bg-primary/10 rounded-full mr-3">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {info.details.map((detail, index) => (
                        <div key={index} className="flex items-center justify-between">
                          {detail.label && <span className="text-sm text-muted-foreground">{detail.label}:</span>}
                          <span
                            className={`font-medium ${detail.action ? "text-primary cursor-pointer hover:underline" : ""} ${!detail.label ? "text-left w-full" : ""}`}
                            onClick={() => handleContactAction(detail.action)}
                          >
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Map Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Find Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Interactive Map</p>
                <p className="text-sm text-muted-foreground">Smart Pilgrimage Portal Office Location</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
