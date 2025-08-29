"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Flame, Star, Settings } from "lucide-react"

const nav = [
  { href: "/", label: "Feed", icon: Home },
  { href: "/trending", label: "Trending", icon: Flame },
  { href: "/favorites", label: "Favorites", icon: Star },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="h-full w-64 shrink-0 border-r bg-background">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-balance">Personalized</h1>
        <p className="text-xs text-muted-foreground">Content Dashboard</p>
      </div>
      <nav className="px-2">
        <ul className="flex flex-col gap-1">
          {nav.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                    active ? "bg-primary/10 text-primary" : "hover:bg-muted",
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
