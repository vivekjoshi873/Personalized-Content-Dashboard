"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Category } from "../types/content"
import { safeStorage } from "../utils/storage"

type PreferencesState = {
  categories: Category[]
  darkMode: boolean
}

const STORAGE_KEY = "prefs:v1"
const initialState: PreferencesState = safeStorage.get<PreferencesState>(STORAGE_KEY, {
  categories: ["technology", "sports", "finance"],
  darkMode: false,
})

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload
      safeStorage.set(STORAGE_KEY, state)
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      safeStorage.set(STORAGE_KEY, state)
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload
      safeStorage.set(STORAGE_KEY, state)
    },
  },
})

export const { setCategories, toggleDarkMode, setDarkMode } = preferencesSlice.actions
export default preferencesSlice.reducer
