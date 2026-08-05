# my-fpl-reborn

Expo mobile app (iOS & Android) for Fantasy Premier League.

## Requirements

- Node.js `25.9.0` (see `.nvmrc`)

```bash
nvm use
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |

## Stack

- Expo SDK 57 + React Native + TypeScript (strict)
- **Expo Router** — file-based navigation (Drawer + Stack + Tabs)
- `react-native-reanimated` — animations
- `@shopify/flash-list` — optimized lists
- `axios` + `@tanstack/react-query` — networking & data fetching
- Jest + React Native Testing Library — unit tests
- Reactotron (`reactotron-react-native`, `reactotron-react-query`) — dev debugging

## Project structure

```
app/                          # Routing only (Expo Router)
├── _layout.tsx               # Root providers
└── (drawer)/                 # Sidebar
    └── (main)/               # Stack (navbar)
        └── (tabs)/           # Bottom tabs (homebar)
            ├── index.tsx     # Home
            ├── squad.tsx
            ├── fixtures.tsx
            └── leagues.tsx

src/
├── api/                      # Axios + React Query
├── config/                   # Reactotron
└── components/               # Shared UI
```

## Navigation

| Layer | Role |
|-------|------|
| **Drawer** | Sidebar menu (swipe from left or hamburger icon) |
| **Tabs header** | Top navbar with screen title |
| **Bottom tabs** | Home, Squad, Fixtures, Leagues |

## Environment

Optional API base URL override:

```bash
EXPO_PUBLIC_API_URL=https://your-api.example.com
```

## Debugging

Install [Reactotron desktop](https://github.com/infinitered/reactotron) and run the app in dev mode. API requests/responses and React Query cache are logged via `src/config/reactotron.ts`.
