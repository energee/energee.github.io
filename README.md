# Energee marketing site

Source snapshot: 00aa64209f1ecce549c35ae1dac9444fc2b39992

## Run locally

Install dependencies and start the Bun development server:

    bun install
    bun dev

Open http://localhost:8000 in your browser. Startup builds the site, then watches
TypeScript sources and serves the generated site with Bun's native HTML server.
Type errors prevent new JavaScript from being emitted.

Check strict types without emitting JavaScript:

    bun run typecheck

The browser smoke check in tests/smoke.mjs exports smoke(page). Run it against
the locally served site with a Playwright page (or tab.playwright in browser
automation) to check tabs and keyboard navigation, approval/reset, the project
brief, and the motion toggle. It requires no additional site dependencies.

## Files

- dist/index.html: page structure and content
- dist/style.css: styling and responsive layouts
- src/app.ts: strict TypeScript for service tabs, demo approval, project-brief download, ASCII animation
- dist/app.js: generated browser JavaScript; edit src/app.ts and rebuild
- tsconfig.json: strict checking, including unchecked indexed access and exact optional properties
- dist/favicon.svg: favicon
- .openai/hosting.json: existing private Sites deployment identity

To host elsewhere, run bun run build and deploy the contents of dist as static files.

The workflow is illustrative. The contact form downloads a local brief and does not submit it. No backend or API keys are required.
