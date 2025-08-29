// Example unit test with Jest + React Testing Library

import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import favoritesReducer from "@/lib/slices/favorites-slice"
import preferencesReducer from "@/lib/slices/preferences-slice"
import { contentApi } from "@/lib/services/content-api"
import { ContentCard } from "@/components/feed/content-card"

function setupStore() {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      preferences: preferencesReducer,
      [contentApi.reducerPath]: contentApi.reducer,
    },
    middleware: (gdm) => gdm().concat(contentApi.middleware),
  })
}

describe("ContentCard", () => {
  it("renders title and handles Favorite click", () => {
    const store = setupStore()
    render(
      <Provider store={store}>
        <ContentCard
          item={{
            id: "1",
            type: "news",
            title: "Hello World",
            description: "desc",
            url: "#",
          }}
        />
      </Provider>,
    )
    expect(screen.getByText("Hello World")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: /favorite/i }))
  })
})
