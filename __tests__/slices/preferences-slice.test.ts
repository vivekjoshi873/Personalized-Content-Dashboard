// Example reducer test

import reducer, { setCategories, toggleDarkMode } from "@/lib/slices/preferences-slice"

describe("preferences slice", () => {
  it("sets categories", () => {
    const state = reducer(undefined, setCategories(["movies"] as any))
    expect(state.categories).toEqual(["movies"])
  })
  it("toggles dark mode", () => {
    const state = reducer(undefined, toggleDarkMode())
    expect(state.darkMode).toBe(true)
  })
})
