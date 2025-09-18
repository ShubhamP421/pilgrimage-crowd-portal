"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Notification {
  id: string
  message: string
  type: "queue" | "traffic" | "emergency" | "general"
  read: boolean
  timestamp: Date
  priority: "low" | "medium" | "high"
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: "High crowd density at Somnath Temple",
      type: "queue",
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      priority: "high",
    },
    {
      id: "2",
      message: "Parking slots available at Zone A",
      type: "traffic",
      read: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      priority: "medium",
    },
    {
      id: "3",
      message: "Emergency alert resolved at Dwarka",
      type: "emergency",
      read: true,
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      priority: "high",
    },
  ])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        { message: "Queue surge detected at Ambaji Temple", type: "queue" as const, priority: "medium" as const },
        { message: "Traffic cleared on Highway 51", type: "traffic" as const, priority: "low" as const },
        { message: "New shuttle service available", type: "general" as const, priority: "low" as const },
        { message: "Weather alert: Light rain expected", type: "general" as const, priority: "medium" as const },
      ]

      if (Math.random() < 0.3) {
        // 30% chance to add a notification every 30 seconds
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)]
        addNotification({
          ...randomMessage,
          read: false,
        })
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
