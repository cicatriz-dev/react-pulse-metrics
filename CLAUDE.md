# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend dev server (http://localhost:3000)
npm run dev

# Backend API (Go, http://localhost:8080)
npm run api

# Run both together
npm run dev:full

# Build
npm run build

# Tests
npm test                  # run all tests once
npm run test:watch        # watch mode
npm run test:coverage     # with coverage
npm run test:e2e          # E2E tests (requires running server on :3001)

# Lint
npm run lint
```

To run a single test file:
```bash
npx jest src/__tests__/Button.test.tsx
```

## Architecture

This is a **marketing metrics dashboard** (Pulse Metrics) with a React/TypeScript frontend and a Go REST API backend.

### Frontend (`src/`)

- **React 17** with React Router v5 (`Switch`/`Route`), **not** v6
- **Redux** (vanilla, no Redux Toolkit) with `redux-thunk` — intentional technical debt used as a teaching point
- Path alias `@/` maps to `src/`
- Styling via **CSS Modules** (`*.module.css`) and **styled-components** side-by-side
- Theme (light/dark) managed in `src/context/ThemeContext.tsx` — provides `{ theme, isDark, toggleTheme }`
- Auth managed in `src/context/AuthContext.tsx` — **PrivateRoute is not yet implemented**; all routes are public

**Redux store slices** (`src/redux/`):
| Slice | Purpose |
|---|---|
| `campaigns` | Campaign list and CRUD state |
| `metrics` | Metrics data |
| `user` | Logged-in user |
| `filters` | Active dashboard filters |
| `reports` | Reports |
| `audiences` | Audience segments |
| `ui` | UI state (modals, loading, etc.) |

**Component organization:**
- `src/components/common/` — reusable UI primitives (Input, Modal, Pagination, etc.)
- `src/components/layout/` — TopBar, Header, Footer, BreadCrumb
- `src/components/Chart/` — Chart.js wrappers (Line, Bar, Pie, Funnel, Heatmap, etc.)
- `src/components/dashboard/` — Dashboard-specific composite components
- `src/components/campaigns/` — Campaign-specific components

**Pages** (`src/pages/`) are grouped by domain: `auth/`, `campaigns/`, `metrics/`, `reports/`, `audience/`, `team/`, `settings/`.

**Mock data** lives in `src/mocks/` (users, audiences, reports) — used when API is unavailable.

Tests live in `src/__tests__/` and use Jest + React Testing Library. The file mock (`src/__mocks__/fileMock.js`) handles static asset imports.

### Backend (`api/`)

Go API using **Gin** framework, listening on `:8080`. All routes are under `/api`. Authentication uses Bearer tokens via `middleware/Auth()`. The `/api/auth/login` route is public; everything else requires a valid token.

Store is in-memory (`api/store/store.go`) seeded via `api/seed/seed.go` — no persistent database.

## Key Notes

- `@typescript-eslint/no-explicit-any` is intentionally **off** — `any` usage exists throughout as acknowledged technical debt
- Redux DevTools wired manually in `store.ts` (RTK would handle this automatically)
- Charts use **Chart.js 3.x** (not Recharts or Victory)
- The project uses **React 17** patterns (no automatic JSX transform configured in places)
