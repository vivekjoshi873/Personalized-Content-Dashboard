"use client"

import { configureStore } from "@reduxjs/toolkit"
import { contentApi } from "./services/content-api"
import preferencesReducer from "./slices/preferences-slice"
import favoritesReducer from "./slices/favorites-slice"
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const makeStore = () =>
  configureStore({
    reducer: {
      [contentApi.reducerPath]: contentApi.reducer,
      preferences: preferencesReducer,
      favorites: favoritesReducer,
    },
    middleware: (getDefault) => getDefault().concat(contentApi.middleware),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
