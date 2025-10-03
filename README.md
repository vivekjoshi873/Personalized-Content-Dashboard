# Personalized Content Dashboard

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://personalized-content-dashboard-six.vercel.app/)

## Overview

An interactive dashboard that aggregates personalized content from multiple sources (news, TMDB movies, social mocks, and search) with filtering, trending, and favorites. Built for a company assignment.


## Live Demo

- App: **[personalized-content-dashboard-six.vercel.app](https://personalized-content-dashboard-six.vercel.app/)**

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript 5
- Tailwind CSS 4
- Redux Toolkit (state management)
- Radix UI primitives + utility components
- Testing Library + Jest (basic tests scaffold)
- Cursor IDE

## Features

- Aggregated feed: news, movies (TMDB), and social mock data
- Search with server route
- Trending and favorites sections
- Theme switching and responsive layout

## Getting Started (Local Development)

### Prerequisites

- Node.js 18+ and npm
- API keys:
  - `NEWSAPI_KEY` (for News API)
  - `TMDB_API_KEY` (for TMDB)

### 1) Clone and install

```bash
git clone https://github.com/vivekjoshi873/Personalized-Content-Dashboard.git
cd Personalized-Content-Dashboard
npm install
```

### 2) Environment variables

Create a `.env` file in the project root:

```bash
NEWSAPI_KEY=your_newsapi_key_here
TMDB_API_KEY=your_tmdb_key_here
```

### 3) Run the app

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 4) Production build

```bash
npm run build
npm start
```

## Project Scripts

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm start` — run built app
- `npm run lint` — lint the project

## Folder Structure (key paths)

- `app/` — Next.js routes and pages (e.g., `app/api/*` for server routes)
- `components/` — UI components
- `lib/` — services, store, slices, types, and utilities
- `public/` — static assets

## Company Assignment Context

This repository is structured and documented for review as part of a company assignment. It demonstrates:

- Clean Next.js architecture with App Router
- API route integrations (NewsAPI, TMDB)
- State management and UI composition
- Good DX: scripts, env management, and clear README

If you need any changes or additions, please let me know. Thank you for your time, and again, apologies for the late submission.
