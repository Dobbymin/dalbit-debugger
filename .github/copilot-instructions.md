# Copilot Instructions for `dalbit-debugger`

## Build, lint, and type-check commands

Use `pnpm` (repo is configured for `pnpm@10` in `packageManager`).

```bash
pnpm install
pnpm dev
pnpm build
pnpm run lint
pnpm run lint:fix
pnpm run format
pnpm run tsc
```

There is currently **no test runner script** in `package.json` (`test` is not defined), so single-test execution is not available yet in this repository.

## High-level architecture (big picture)

This is a React + Vite + TypeScript app organized with Feature-Sliced Design conventions.

- App entry:
  - `src/main.tsx` mounts `<App />` inside `ApplicationProvider`.
  - `src/app/provider/ApplicationProvider.tsx` currently wraps the app with React Query provider.
- Routing:
  - `src/App.tsx` renders `Router`.
  - `src/app/routes/Routes.tsx` defines routes with `BrowserRouter` + nested `RootLayout`.
  - Route path constants are centralized in `src/shared/constants/route-path.ts`.
- Layers:
  - `app` for bootstrapping/providers/routes.
  - `pages` for route entry pages (`MainPage`, `DebuggerPage`, `ExamplesPage`, `NotFound`).
  - `widgets`, `features`, `entities`, `shared` exist and are exported through layer-level barrels (`index.ts`).
- Current implementation status:
  - Many slices are scaffolding/placeholder (several barrel files are empty; page components are minimal).
  - `CLAUDE.md` and `docs/rule/fsd-rule.md` describe the intended target structure for the debugger/domain runtime integration.

## Key repository conventions

These are project-specific conventions repeatedly stated in `CLAUDE.md` and `docs/rule/*`:

- Follow FSD dependency direction strictly: `app -> pages -> widgets -> features -> entities -> shared`.
- Avoid same-layer cross-slice imports (e.g. feature-to-feature direct imports).
- Use public APIs through barrel exports:
  - `@/shared` (not deep shared paths)
  - `@/entities` (not deep entity internals)
  - `@/widgets` (not deep widget internals)
  - `@/features` public surface only
- Import alias `@` points to `src` (configured in both `vite.config.ts` and `tsconfig.app.json`).
- Export style convention:
  - `pages/*/*Page.tsx` are default exports and re-exported from each page `index.ts`.
  - Other layers prefer named exports.
- Formatting/import order is enforced by Prettier + `@trivago/prettier-plugin-sort-imports` (`.prettierrc`):
  - React imports first, then third-party, then `@/`, then relative imports.
- Runtime/domain-specific guidance for future debugger implementation:
  - Use `@dalbit-yaksok/core` `YaksokSession`.
  - Recreate session when code changes (do not reuse stale session state).
  - Wrap `runModule()` in `try/catch` and handle machine-readable errors.
  - If runtime patching is needed, use `pnpm patch` (never edit `node_modules` directly).
