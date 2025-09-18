"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Menu, Bell, Sun, Moon, AlertTriangle, Car, Users } from "lucide-react"
import { useTheme } from "next-themes"

interface Notification {
  id: string
  message: string
  type: "queue" | "traffic" | "emergency" | "general"
  read: boolean
  timestamp: Date
  priority: "low" | "medium" | "high"
}

interface HeaderProps {
  onMenuClick: () => void
  notifications: Notification[]
  onNotificationClick: (id: string) => void
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "queue":
      return Users
    case "traffic":
      return Car
    case "emergency":
      return AlertTriangle
    default:
      return Bell
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-red-600 dark:text-red-400"
    case "medium":
      return "text-yellow-600 dark:text-yellow-400"
    case "low":
      return "text-green-600 dark:text-green-400"
    default:
      return "text-muted-foreground"
  }
}

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
}

export function Header({ onMenuClick, notifications, onNotificationClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
      {/* Left: Hamburger Menu */}
      <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      {/* Center: Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">SP</span>
        </div>
        <h1 className="text-xl font-bold text-foreground hidden sm:block">Smart Pilgrimage Portal</h1>
      </div>

      {/* Right: Theme Toggle & Notifications */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
            <div className="p-2 border-b">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && <p className="text-sm text-muted-foreground">{unreadCount} unread</p>}
            </div>
            {notifications.length === 0 ? (
              <DropdownMenuItem disabled>
                <div className="text-center py-4">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              </DropdownMenuItem>
            ) : (
              notifications.slice(0, 10).map((notification) => {
                const Icon = getNotificationIcon(notification.type)
                return (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={() => onNotificationClick(notification.id)}
                    className={`p-3 cursor-pointer ${notification.read ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <div className={`p-1 rounded-full ${getPriorityColor(notification.priority)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{notification.message}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-muted-foreground">{formatTimeAgo(notification.timestamp)}</p>
                          {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                )
              })
            )}
            {notifications.length > 10 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-sm text-muted-foreground">
                  +{notifications.length - 10} more notifications
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
