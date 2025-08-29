"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDebouncedCallback } from "use-debounce"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export function Topbar() {
  const router = useRouter()
  const params = useSearchParams()
  const [value, setValue] = useState(params.get("q") ?? "")
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const onSearch = useDebouncedCallback((q: string) => {
    const qp = new URLSearchParams(params.toString())
    if (q) qp.set("q", q)
    else qp.delete("q")
    router.push(`/search?${qp.toString()}`)
  }, 400)

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Input
          placeholder="Search news, movies, posts..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onSearch(e.target.value)
          }}
          className="max-w-xl"
          aria-label="Global search"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className={cn("h-9 w-9 p-0")}
          aria-label={mounted && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => {
            if (!mounted) return
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }}
        >
          {mounted ? resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" /> : null}
        </Button>
      </div>
    </header>
  )
}
