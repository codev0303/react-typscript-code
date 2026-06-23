# Onboarding Tracker

A React + TypeScript app for browsing users and their onboarding task lists. Data is loaded from the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API.

## Features

- User list with navigation to per-user task views
- Todo checklist with completion status
- Global error alerts via Redux
- Error boundary for render-time failures
- Responsive layout with Tailwind CSS

## Tech Stack

| Layer | Tools |
|-------|-------|
| UI | React 18, TypeScript |
| Build | [Vite](https://vitejs.dev/) |
| Routing | React Router v6 |
| State | Redux, Redux Thunk |
| Styling | Tailwind CSS, styled-components |
| HTTP | Axios |

## Prerequisites

- [Node.js](https://nodejs.org/) 16 or later
- [Yarn](https://yarnpkg.com/) (recommended) or npm

## Getting Started

### Install dependencies

```bash
yarn
```

### Development

```bash
yarn dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production build

```bash
yarn build
```

Output is written to the `dist/` folder.

### Preview production build locally

```bash
yarn preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start the Vite dev server |
| `yarn build` | Type-check with TypeScript, then build for production |
| `yarn preview` | Serve the production build locally |

## Routes

| Path | Description |
|------|-------------|
| `/` | Home — users list and todos for user `1` (default) |
| `/users/:userId` | Home — users list and todos for the selected user |
| `*` | 404 page |

## Project Structure

```
src/
├── App.tsx                 # Router and app shell
├── pages/
│   └── Home.tsx            # Main page — users and todos
├── component/
│   ├── Alerts/             # Redux-driven error/info alerts
│   ├── Checklist/          # Todo list UI
│   ├── ErrorBoundary/      # Catches render errors
│   ├── User/               # User list item with link
│   └── loader/             # Loading spinner
├── hooks/
│   └── use_get_request_hook.ts   # Reusable GET request hook
├── store/                  # Redux store, actions, reducers
├── helpers/                # HTTP client and URL utilities
└── constants/              # API routes and types
```

## API

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock backend:

- `GET /users` — list of users
- `GET /users/:id/todos` — todos for a given user

The Axios client is configured in `src/helpers/http.js`.

## Deployment

This project is set up for [GitHub Pages](https://pages.github.com/) at the `/users/` subpath.

- `package.json` sets `homepage` to `https://jtad009.github.io/users`
- `vite.config.ts` sets `base: '/users/'` for production builds
- `BrowserRouter` uses `import.meta.env.BASE_URL` as its basename

To deploy with [gh-pages](https://www.npmjs.com/package/gh-pages), add a deploy script to `package.json` and run:

```bash
yarn build
npx gh-pages -d dist
```

## License

No license specified.
