// Settings page for categories

"use client"

import ReduxProvider from "@/components/providers/redux-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import { setCategories } from "@/lib/slices/preferences-slice"
import type { Category } from "@/lib/types/content"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const ALL_CATEGORIES: Category[] = ["technology", "sports", "finance", "movies", "music", "social"]

function SettingsInner() {
  const selected = useAppSelector((s) => s.preferences.categories)
  const dispatch = useAppDispatch()

  const toggle = (c: Category) => {
    const exists = selected.includes(c)
    const next = exists ? selected.filter((x) => x !== c) : [...selected, c]
    dispatch(setCategories(next))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Content Preferences</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {ALL_CATEGORIES.map((c) => (
          <label key={c} className="flex items-center gap-2 rounded-md border p-3">
            <Checkbox checked={selected.includes(c)} onCheckedChange={() => toggle(c)} />
            <span className="capitalize">{c}</span>
          </label>
        ))}
      </div>
      <div className="pt-2">
        <Button variant="secondary" onClick={() => dispatch(setCategories(ALL_CATEGORIES))}>
          Select All
        </Button>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <ReduxProvider>
      <div className="flex min-h-dvh">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="mx-auto max-w-3xl p-4">
            <SettingsInner />
          </div>
        </main>
      </div>
    </ReduxProvider>
  )
}
