// Project Plan, Architecture, and Notes

# Personalized Content Dashboard - Project Plan

1) Core Features
- Personalized Feed: user-selectable categories (technology, sports, finance, movies, music, social).
- Persistence: preferences and favorites stored in Redux, synced to localStorage.
- Multi-Source Content via API Routes:
  - /api/news → NewsAPI proxy (NEWSAPI_KEY env required).
  - /api/tmdb → TMDB proxy (TMDB_API_KEY optional; falls back to mock).
  - /api/social → Mock social feed with hashtags.
  - /api/feed → Aggregates above by categories.
  - /api/trending → Trending composition.
  - /api/search → Full-text across sources.
- Interactive Cards with images, CTAs, and favorites.
- Infinite Scroll via IntersectionObserver.
- Debounced Global Search in Topbar.

2) Layout
- Responsive shell: sidebar + top header.
- Sections:
  - / → Personalized Feed
  - /trending → Trending
  - /favorites → Favorites
  - /settings → Preferences

3) State Management
- Redux Toolkit store with slices:
  - preferences-slice: categories + darkMode.
  - favorites-slice: favorites list.
- RTK Query service (content-api) for fetching feed/trending/search.
- localStorage persistence with safe guards (SSR-friendly).

4) Advanced UI/UX
- Drag-and-drop reordering within feed using Framer Motion Reorder.
- Dark mode using next-themes (ThemeProvider in layout).
- Smooth animations (Framer Motion) + hover states via shadcn/ui.

5) Testing
- Unit: Jest + RTL (examples in __tests__/).
- Integration: render pages and assert empty, loading, and error states.
- E2E: Use Playwright or Cypress to cover search, drag-and-drop, and favorites flow.

6) Performance & Accessibility Best Practices
- Server-side API key proxy to keep secrets safe.
- RTK Query caching and request de-duplication.
- Pagination + infinite scroll to limit payloads.
- Debounced search input to reduce calls.
- Semantic HTML, alt text on images, keyboard-focusable buttons.
- Maintain WCAG AA contrast using Tailwind tokens.

7) Color & Typography (3-5 colors total)
- Primary: Blue (Tailwind primary token)
- Neutrals: Background/Foreground (white/gray/black via tokens)
- Accent: Emerald (actions/accents)
- Fonts: Geist Sans/Mono via existing layout.

8) Deployment
- Recommended: Vercel.
- Project Settings → Environment Variables:
  - NEWSAPI_KEY = 5f3d30ec458a4dd49f735ecf1b29a527
  - TMDB_API_KEY = <optional_tmdb_key>
- Publish from v0 UI or connect GitHub for CI/CD.

9) Next Steps / Enhancements
- Auth & multi-user profiles.
- Redux Persist if you want more robust persistence.
- Real social integrations (Twitter/Instagram APIs) or music (Spotify) with server routes.
- Offline caching for recently viewed items.
