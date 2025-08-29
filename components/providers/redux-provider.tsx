"use client"
// Redux Provider wrapper for App Router
import type React from "react"

import { Provider } from "react-redux"
import { makeStore } from "@/lib/store"
import { useRef } from "react"

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<ReturnType<typeof makeStore>>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
