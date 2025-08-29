"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ContentItem } from "../types/content"
import { safeStorage } from "../utils/storage"

type FavoritesState = {
  ids: string[]
  items: Record<string, ContentItem>
}

const STORAGE_KEY = "favorites:v1"
const initialState: FavoritesState = safeStorage.get<FavoritesState>(STORAGE_KEY, {
  ids: [],
  items: {},
})

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<ContentItem>) {
      const id = action.payload.id
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id)
        delete state.items[id]
      } else {
        state.ids.unshift(id)
        state.items[id] = action.payload
      }
      safeStorage.set(STORAGE_KEY, state)
    },
    removeFavoriteById(state, action: PayloadAction<string>) {
      const id = action.payload
      state.ids = state.ids.filter((x) => x !== id)
      delete state.items[id]
      safeStorage.set(STORAGE_KEY, state)
    },
  },
})

export const { toggleFavorite, removeFavoriteById } = favoritesSlice.actions
export default favoritesSlice.reducer
