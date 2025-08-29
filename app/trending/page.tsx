// Trending route

import ReduxProvider from "@/components/providers/redux-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { TrendingSection } from "@/components/sections/trending-section"

export default function TrendingPage() {
  return (
    <ReduxProvider>
      <div className="flex min-h-dvh">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl p-4">
            <TrendingSection />
          </div>
        </main>
      </div>
    </ReduxProvider>
  )
}
