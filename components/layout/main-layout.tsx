"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { NotificationProvider, useNotifications } from "../notification-manager"

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { notifications, markAsRead } = useNotifications()

  const handleNotificationClick = (id: string) => {
    markAsRead(id)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 lg:ml-0">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <NotificationProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </NotificationProvider>
  )
}
