// Favorites route

import ReduxProvider from "@/components/providers/redux-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { FavoritesSection } from "@/components/sections/favorites-section"

export default function FavoritesPage() {
  return (
    <ReduxProvider>
      <div className="flex min-h-dvh">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl p-4">
            <h2 className="mb-4 text-lg font-semibold">Favorites</h2>
            <FavoritesSection />
          </div>
        </main>
      </div>
    </ReduxProvider>
  )
}
