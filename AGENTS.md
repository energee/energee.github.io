# UI components

- Use official shadcn/ui components for every UI control and UX primitive.
- Search the official shadcn component catalog before adding an interface element.
- Add components with `bunx --bun shadcn@latest add <component>` using components.json.
- Compose installed components and customize their theme; do not invent replacement primitives.
- If shadcn does not provide a component that fulfills the interface, ask the user for guidance before implementing an alternative.
- Semantic page content and layout may use HTML and CSS; interactive controls must come from shadcn.
- The user approved the existing ASCII canvas as decoration. Keep continuous animation with a subtle shadcn pause/play button; respect reduced motion.
- Keep strict TypeScript enabled and keep startup as `bun dev`.
- The backend is deferred.
