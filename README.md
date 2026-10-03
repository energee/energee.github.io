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
The page follows the browser/preview light or dark preference. Page content,
shadcn controls, and the canvas share theme colors; the root also accepts
`class="light"` / `class="dark"` or `data-theme` overrides. Browser checks export
`themeSmoke(page, scheme)` to verify both palettes, text contrast, and ghost
button spacing.

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

Contact opens an email draft with the selected service and optional workflow
description. The user reviews and sends it in their email app; no backend is
required. `contactEmail` in `src/App.tsx` is currently the clearly labeled
placeholder `hello@energee.example`. Replace it with the approved public address
before launch. The backend remains deferred.

The MGR examples describe functionality documented in its public staff guide.
They do not establish measured savings or phone-agent performance. Approved
customer quotes, screenshots, call recordings, team details, and indicative
pricing can be added when supplied; do not invent evidence or publish mock
results as customer outcomes.
