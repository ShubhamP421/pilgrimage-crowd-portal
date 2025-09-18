"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, BarChart3, Clock, Car, AlertTriangle, Smartphone, Settings, Phone, HelpCircle, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/crowd-dashboard", label: "Crowd Dashboard", icon: BarChart3 },
  { href: "/smart-queues", label: "Smart Queues", icon: Clock },
  { href: "/traffic-parking", label: "Traffic & Parking", icon: Car },
  { href: "/emergency", label: "Emergency", icon: AlertTriangle },
  { href: "/pilgrim-app", label: "Pilgrim App (B2C)", icon: Smartphone },
  { href: "/admin", label: "Admin Panel (B2B)", icon: Settings },
  { href: "/contact", label: "Contact Us", icon: Phone },
  { href: "/help", label: "Help & Support", icon: HelpCircle },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border lg:hidden">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
