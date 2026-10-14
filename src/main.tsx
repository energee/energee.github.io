import { createRoot, hydrateRoot } from "react-dom/client";
import { PageApp, pageFor } from "./pages";

const root = document.getElementById("root");
if (!root) throw new Error("Missing site root");
const app = <PageApp page={pageFor(location.pathname)} />;
// Built pages arrive prerendered and hydrate; the dev server serves an empty root.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
