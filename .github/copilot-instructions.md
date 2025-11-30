# Copilot Instructions for candidatos-rhfood

## Project Overview
- This is a Nuxt 3 (Vue 3) monorepo for a recruitment platform (RHFood), using TypeScript and pnpm for package management.
- The main app is in the `app/` directory, with pages, layouts, components, composables, plugins, and utilities.
- Content-driven: Markdown/YAML files in `content/` provide dynamic site data (e.g., vacancies, steps, about/contact info).

## Key Structure & Patterns
- **Pages:** `app/pages/` uses Nuxt file-based routing. Dynamic routes (e.g., `vacancies/[slug].vue`) are used for vacancy details and applications.
- **Components:** Shared UI in `app/components/`, with feature modules under `app/components/modules/`.
- **Composables:** Custom composables (e.g., `useApiError.ts`) for API error handling and shared logic.
- **Plugins:** Nuxt plugins (e.g., `api-auth.client.ts`) for client-side API auth.
- **Content:** Markdown/YAML in `content/` is loaded for static/dynamic site sections.
- **Config:** Nuxt config in `nuxt.config.ts`, app config in `app/app.config.ts`.

## Developer Workflows
- **Install:** `pnpm install`
- **Dev server:** `pnpm dev` (or `nuxi dev`)
- **Build:** `pnpm build`
- **Preview:** `pnpm preview`
- **Lint:** `pnpm lint`
- **Type check:** `pnpm typecheck`

## Conventions
- Use TypeScript for all logic files.
- Use composition API in Vue components.
- Prefer composables for shared logic.
- Use `content/` for editable site data (not hardcoded in components).
- Use `assets/css/main.css` for global styles.
- Use `public/` for static assets.

## Integration Points
- API auth handled via plugin (`app/plugins/api-auth.client.ts`).
- Content loaded from `content/` (YAML/Markdown) for dynamic pages.

## Examples
- To add a new vacancy: create a Markdown file in `content/vacancies/`.
- To add a new page: add a `.vue` file to `app/pages/`.
- To add a global composable: add to `app/composables/`.

## References
- Nuxt docs: https://nuxt.com/docs
- pnpm docs: https://pnpm.io/motivation

