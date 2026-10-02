# Energee marketing site

## Run locally

    bun install
    bun dev

Open http://localhost:8000. Bun bundles the React/TypeScript source and Tailwind
styles directly, with hot reload. A parallel TypeScript watcher reports errors.

    bun run typecheck
    bun test
    bun run build

The build checks strict types before generating a static site in `dist`.
Deploy the contents of `dist`; no backend or API keys are required.

## UI components

All UI controls use official [shadcn/ui](https://ui.shadcn.com/docs/components)
components installed into `src/components/ui`. `components.json` configures the
registry, aliases, and CSS theme. Add components with:

    bunx --bun shadcn@latest add <component>

Use shadcn for every UX primitive. If the catalog has no suitable component,
ask the user for guidance before implementing an alternative. `AGENTS.md`
records this rule. Page content and layout use semantic HTML and CSS.
The existing ASCII canvas is approved decoration; it animates continuously,
respects reduced motion, and has a subtle shadcn pause/play button.

## Files

- src/App.tsx: page composition using shadcn components
- src/components/ui/: official shadcn component source
- src/services.ts: service content
- src/ascii.ts: decorative signal field and observer cleanup
- src/index.html: HTML entry point and page metadata
- src/styles.css: Tailwind and shadcn theme tokens
- src/site.css: responsive page layout and typography
- build.ts: Bun static production build
- tests/smoke.mjs: browser interaction check; exports smoke(page) for a Playwright page or tab.playwright
- .openai/hosting.json: ignored local Sites deployment identity

TypeScript uses strict checking, unchecked indexed access, and exact optional
property types. `skipLibCheck` skips third-party declarations because Radix's
Select declarations conflict with exact optional properties; application and
component source remain checked.

The workflow is illustrative. The contact form downloads a local brief and
does not submit it. The backend is deferred.
