# Energee marketing site

Problem-led marketing for applied AI: customer response, business knowledge,
and repetitive work across systems. Calls are a prominent application, not the
entire offer. The call to action is workflow discovery, followed by a scoped,
measurable pilot; the site does not promise universal ROI or a blanket guarantee.

The homepage separates business problems (`#problems`), pilot delivery (`#how`),
technical capabilities (`#technology`), and demonstrated work (`#work`). Technical
accordions explain RAG, bounded tools and integrations, voice, model adaptation,
and evaluation. RAG supplies retrieved context without changing model weights;
fine-tuning changes weights for task-specific behavior and is recommended only
when suitable data and evaluation justify it. These describe services to scope,
not claims that every capability has shipped in MGR. No AI backend is added.

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

## Pages and SEO

The site has five URLs: `/`, `/ai-phone-agents/`, `/knowledge-search/`, `/workflow-automation/`,
and `/work/mgr/`. `bun run build` prerenders each to its own `dist/<path>/index.html`
with a unique title, description, canonical URL, Open Graph tags, and JSON-LD
(`Organization` on home; `BreadcrumbList` and `Service` on the others), and writes
`dist/sitemap.xml` and `dist/robots.txt`. The browser hydrates the prerendered HTML.
`bun dev` serves the same app for any path, rendered in the browser.

To add a page, add it to `pages` in `src/pages.tsx` (a service goes in `src/services.ts`);
the sitemap and tests pick it up. Page copy must not claim results the site has no evidence for.
`siteUrl` in `src/seo.tsx` is the production origin used by canonicals and the sitemap.

## Files

- src/pages.tsx: every page (home, three services, MGR case study) as data; `pageFor()` and `PageApp`
- src/services.ts: copy, titles, and descriptions for the three service pages (also drives the nav and home cards)
- src/Layout.tsx: shared header, footer, and contact dialog; `ContactButton` opens it
- src/seo.tsx: build-time prerender, canonical/Open Graph/JSON-LD tags, `sitemap.xml`, `robots.txt`, and `siteUrl`
- src/components/ui/: official shadcn component source
- src/ascii.ts: decorative signal field and observer cleanup
- src/index.html: HTML template every page is built from (absolute asset URLs; head tags are filled per page by seo.tsx)
- src/styles.css: Tailwind and shadcn theme tokens
- src/site.css: responsive page layout and typography
- build.ts: Bun static production build; writes one prerendered `index.html` per page plus the sitemap and robots.txt
- .github/workflows/pages.yml: GitHub Pages deploy on push to master
- tests/smoke.mjs: browser checks for positioning, technical accordions, metadata, contact drafting, focus restoration, and motion; exports smoke(page) for `/`, smokePage(page) for the other pages, and themeSmoke(page) for a Playwright page or tab.playwright (run separately from bun test)
- .openai/hosting.json: ignored local Sites deployment identity

TypeScript uses strict checking, unchecked indexed access, and exact optional
property types. `skipLibCheck` skips third-party declarations because Radix's
Select declarations conflict with exact optional properties; application and
component source remain checked.

Contact opens an email draft with subject `Workflow discovery: <business type>`
and the workflow brief as its body. Business type defaults to `Not specified`
until the visitor chooses one. The form asks for the problem, existing tools,
and desired result, and cautions against sharing customer records or confidential
documents. The user reviews and sends it in their email app; no backend is
required. `contactEmail` in `src/Layout.tsx` is currently the clearly labeled
placeholder `hello@energee.example`. Replace it with the approved public address
before launch. The backend remains deferred.

The MGR examples describe functionality documented in its public staff guide.
They do not establish measured savings, voice or RAG performance, or a fine-tuned
model deployment. Approved
customer quotes, screenshots, call recordings, team details, and indicative
pricing can be added when supplied; do not invent evidence or publish mock
results as customer outcomes.
