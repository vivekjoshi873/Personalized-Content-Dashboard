// Root dashboard page with sidebar + topbar and personalized feed

import ReduxProvider from "@/components/providers/redux-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { PersonalizedFeed } from "@/components/feed/personalized-feed"

export default function Page() {
  return (
    <ReduxProvider>
      <div className="flex min-h-dvh">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl p-4">
            <h2 className="mb-4 text-xl font-semibold">Your Personalized Feed</h2>
            <PersonalizedFeed />
          </div>
        </main>
      </div>
    </ReduxProvider>
  )
}
