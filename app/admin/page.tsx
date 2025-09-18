"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Shield, Users, BarChart3, AlertTriangle, Clock, TrendingUp } from "lucide-react"

const pricingPlans = [
  {
    name: "Basic",
    price: "₹9,999",
    period: "/month",
    features: [
      "Up to 5,000 visitors/day",
      "Basic crowd monitoring",
      "Email support",
      "Standard reporting",
      "Mobile app access",
    ],
    popular: false,
  },
  {
    name: "Plus",
    price: "₹19,999",
    period: "/month",
    features: [
      "Up to 15,000 visitors/day",
      "Advanced analytics",
      "Priority support",
      "Real-time alerts",
      "Custom integrations",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: "₹39,999",
    period: "/month",
    features: [
      "Unlimited visitors",
      "AI-powered insights",
      "24/7 phone support",
      "White-label solution",
      "Advanced security",
      "Dedicated account manager",
    ],
    popular: false,
  },
]

const adminStats = [
  { label: "Total Visitors Today", value: "12,450", icon: Users, change: "+8.2%" },
  { label: "Average Wait Time", value: "18 min", icon: Clock, change: "-12%" },
  { label: "Active Incidents", value: "3", icon: AlertTriangle, change: "+1" },
  { label: "Staff Deployed", value: "45", icon: Shield, change: "0%" },
]

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  })
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Simulate login
    setIsAuthenticated(true)
    toast({
      title: "Login Successful",
      description: "Welcome to the Admin Dashboard",
    })
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.organizationName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    // Simulate signup
    setIsAuthenticated(true)
    toast({
      title: "Account Created",
      description: "Your admin account has been created successfully",
    })
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Reset Link Sent",
      description: "Password reset link has been sent to your email",
    })
  }

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your pilgrimage site with powerful B2B tools</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Authentication Forms */}
            <Card>
              <CardHeader>
                <CardTitle>Access Admin Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="reset">Reset</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="admin@temple.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            placeholder="Enter your password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Login to Dashboard
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="orgName">Organization Name</Label>
                        <Input
                          id="orgName"
                          value={formData.organizationName}
                          onChange={(e) => handleInputChange("organizationName", e.target.value)}
                          placeholder="Temple Trust Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupEmail">Email</Label>
                        <Input
                          id="signupEmail"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="admin@temple.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupPassword">Password</Label>
                        <Input
                          id="signupPassword"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="Create a strong password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          placeholder="Confirm your password"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Create Admin Account
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="reset" className="space-y-4">
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="resetEmail">Email</Label>
                        <Input
                          id="resetEmail"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email address"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Reset Link
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Pricing Plans */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingPlans.map((plan) => (
                    <Card key={plan.name} className={`border-2 ${plan.popular ? "border-primary" : ""}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{plan.name}</h3>
                            <div className="flex items-baseline">
                              <span className="text-2xl font-bold text-primary">{plan.price}</span>
                              <span className="text-muted-foreground">{plan.period}</span>
                            </div>
                          </div>
                          {plan.popular && <Badge variant="default">Popular</Badge>}
                        </div>
                        <ul className="space-y-1 text-sm">
                          {plan.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                          {plan.features.length > 3 && (
                            <li className="text-muted-foreground">+{plan.features.length - 3} more features</li>
                          )}
                        </ul>
                        <Button className="w-full mt-3" variant={plan.popular ? "default" : "outline"}>
                          Choose Plan
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    )
  }

  // Admin Dashboard (after authentication)
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Administrator</p>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminStats.map((stat) => {
            const Icon = stat.icon
            const isPositive = stat.change.startsWith("+")
            const isNegative = stat.change.startsWith("-")

            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp
                          className={`h-4 w-4 mr-1 ${
                            isPositive
                              ? "text-green-600 dark:text-green-400"
                              : isNegative
                                ? "text-red-600 dark:text-red-400"
                                : "text-muted-foreground"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isPositive
                              ? "text-green-600 dark:text-green-400"
                              : isNegative
                                ? "text-red-600 dark:text-red-400"
                                : "text-muted-foreground"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitor Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Visitor Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Peak Hours</span>
                  <span className="font-medium">2:00 PM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Busiest Temple</span>
                  <span className="font-medium">Somnath Temple</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Visit Duration</span>
                  <span className="font-medium">45 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Satisfaction Rate</span>
                  <span className="font-medium text-green-600 dark:text-green-400">94.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Deployment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Staff Deployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Security Personnel</span>
                  <Badge variant="outline">15 Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Crowd Managers</span>
                  <Badge variant="outline">12 Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Medical Staff</span>
                  <Badge variant="outline">8 Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Volunteers</span>
                  <Badge variant="outline">10 Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Recent Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">Medical Emergency</p>
                    <p className="text-xs text-muted-foreground">Somnath Temple - 2 min ago</p>
                  </div>
                  <Badge variant="destructive">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">Crowd Surge</p>
                    <p className="text-xs text-muted-foreground">Dwarka Temple - 15 min ago</p>
                  </div>
                  <Badge variant="secondary">Resolved</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">Lost Child</p>
                    <p className="text-xs text-muted-foreground">Ambaji Temple - 1 hour ago</p>
                  </div>
                  <Badge variant="secondary">Resolved</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wait Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Current Wait Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Somnath Temple</span>
                  <Badge variant="destructive">45 min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dwarka Temple</span>
                  <Badge variant="default">25 min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ambaji Temple</span>
                  <Badge variant="secondary">15 min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pavagadh Temple</span>
                  <Badge variant="default">35 min</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
