# Memory: react-pulse-metrics

## Project Overview
Marketing metrics dashboard (Pulse Metrics) — React 17 + TypeScript frontend, Go/Gin backend.

## Tech Stack
- React 17, React Router v5, Redux (vanilla, no RTK) + redux-thunk
- Jest 27 + @testing-library/react v12 (NO `renderHook` - use component wrapper pattern)
- Vite dev server on :3000, Go API on :8080
- Path alias `@/` = `src/`
- CSS Modules + styled-components + inline styles (all three coexist)

## Test Coverage (as of aula-2/video-2.3)
- **Baseline**: ~17.39% statements
- **After test expansion**: ~32.23% statements, 317 tests passing
- Target was ~45% but user approved stopping at ~32%

### Coverage by area
- `src/redux/reducers`: 100% (all 7 reducers fully tested)
- `src/utils`: ~84% (most utility functions tested)
- `src/hooks`: ~37% (usePagination, useDebounce, useFilters tested)
- `src/context`: ThemeContext tested
- `src/components/dashboard/MetricsCard`: 100%

### Test file structure
Tests in `src/__tests__/` with subdirs:
- `utils/` — pure function tests
- `reducers/` — all 7 reducers
- `hooks/` — usePagination, useDebounce, useFilters
- `components/` — Button, Input, Pagination, MetricsCard, CampaignStatus, Badge, ProgressBar, CampaignCard
- `actions/` — userActions, filterActions
- `context/` — ThemeContext

### Key testing patterns
- **Hooks with Redux**: use component wrapper + `createStore(combineReducers({filters: filterReducer}))` inline (NOT `src/redux/store.ts`)
- **Fake timers**: `jest.useFakeTimers()` in beforeEach for useDebounce tests
- **No renderHook**: @testing-library/react v12 doesn't have it; use rendered component with data-testid
- **Intl formatting**: use `toMatch(/R\$/)` not exact string
- **Date-only strings**: use `'2024-01-15T12:00:00'` with time to avoid timezone offset bugs
- **Snapshots**: ALL replaced with real assertions; .snap files deleted

## Important Notes
- Redux store uses manual DevTools setup: `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`
- `@typescript-eslint/no-explicit-any` intentionally OFF (technical debt)
- E2E tests (e2e/ dir) always fail without running server — ignore in unit test runs
- Mock campaigns export is `mockCampaigns` (lowercase m), not `MOCK_CAMPAIGNS`
- `CREATE_CAMPAIGN` appends to end of list (NOT unshift)
- `FETCH_CAMPAIGNS_SUCCESS` payload is `Campaign[]` array (total = array.length)
