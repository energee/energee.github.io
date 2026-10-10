# Energee marketing site

One offer: an AI phone agent answers the calls a business misses (after hours,
weekends, busy moments), books them into its calendar, and texts the owner. Flat
monthly fee with a 30-day guarantee; the call to action is a free missed-call count.

## Run locally

    bun install
    bun dev

Open http://localhost:8000. Bun bundles the React/TypeScript source and Tailwind
styles directly, with hot reload. A parallel TypeScript watcher reports errors.

    bun run typecheck
    bun test
    bun run build

The build checks strict types before generating a static site in `dist`.
Pushes to `master` on energee/energee.github.io run `.github/workflows/pages.yml`,
which tests, builds, and publishes `dist` to GitHub Pages at https://energ.ee.
No backend or API keys are required.

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
The hero is the focal point: an oversized headline with a lime accent phrase, a faint
glow behind the text that slowly drifts (CSS only; the pause button and reduced motion
freeze it), and a brighter, slowly pulsing ASCII field that spans the full viewport width
(the text stays in the 1440px column). Sections below it
fade and rise in on scroll (CSS `animation-timeline: view()`; skipped when unsupported
or under reduced motion).
The page is always dark (`class="dark"` on `<html>`); there is no light theme.
Page content, shadcn controls, and the canvas share theme colors. Browser checks
export `themeSmoke(page)` to verify the dark background, text contrast, and ghost
button spacing.

## Files

- src/App.tsx: page composition using shadcn components
- src/components/ui/: official shadcn component source
- src/ascii.ts: decorative signal field and observer cleanup
- src/index.html: HTML entry point and page metadata
- src/styles.css: Tailwind and shadcn theme tokens
- src/site.css: responsive page layout and typography
- build.ts: Bun static production build
- .github/workflows/pages.yml: GitHub Pages deploy on push to master
- tests/smoke.mjs: browser interaction check; exports smoke(page) for a Playwright page or tab.playwright
- .openai/hosting.json: ignored local Sites deployment identity

TypeScript uses strict checking, unchecked indexed access, and exact optional
property types. `skipLibCheck` skips third-party declarations because Radix's
Select declarations conflict with exact optional properties; application and
component source remain checked.

Contact opens an email draft with the selected business type and a description
of how calls are handled today. The user reviews and sends it in their email app; no backend is
required. `contactEmail` in `src/App.tsx` is currently the clearly labeled
placeholder `hello@energee.example`. Replace it with the approved public address
before launch. The backend remains deferred.

The MGR examples describe functionality documented in its public staff guide.
They do not establish measured savings or phone-agent performance. Approved
customer quotes, screenshots, call recordings, team details, and indicative
pricing can be added when supplied; do not invent evidence or publish mock
results as customer outcomes.
