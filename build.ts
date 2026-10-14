import tailwind from "bun-plugin-tailwind";
import { mkdir } from "node:fs/promises";
import { pages } from "./src/pages";
import { renderPageHtml, robots, sitemap } from "./src/seo";

const result = await Bun.build({
  entrypoints: ["./src/index.html"],
  outdir: "./dist",
  target: "browser",
  minify: true,
  // Absolute asset URLs: the same HTML is written into nested folders like /work/mgr/.
  publicPath: "/",
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [tailwind],
});

if (!result.success) throw new AggregateError(result.logs, "Site build failed");

// Bun emits one index.html with hashed assets. Write a prerendered copy per page:
// every URL becomes a real HTML document with its own head tags and content.
const template = await Bun.file("./dist/index.html").text();
for (const page of pages) {
  const dir = `./dist${page.path}`;
  await mkdir(dir, { recursive: true });
  await Bun.write(`${dir}index.html`, renderPageHtml(template, page));
}
await Bun.write("./dist/sitemap.xml", sitemap());
await Bun.write("./dist/robots.txt", robots());
