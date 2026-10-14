import { expect, test } from "bun:test";
import { pages } from "../src/pages";
import { renderPageHtml, robots, siteUrl, sitemap } from "../src/seo";

const template = '<!doctype html><html><head><title>x</title><meta name="description" content="x"></head><body><div id="root"></div></body></html>';
const rendered = pages.map(page => [page, renderPageHtml(template, page)] as const);

test("every page has a unique path, title, and description within search-result lengths", () => {
  for (const key of ["path", "title", "description"] as const) {
    expect(new Set(pages.map(page => page[key])).size).toBe(pages.length);
  }
  for (const { title, description } of pages) {
    expect(title.length).toBeLessThanOrEqual(65);
    expect(description.length).toBeLessThanOrEqual(160);
  }
});

test("every page prerenders one h1, its own head tags, and valid JSON-LD", () => {
  for (const [page, html] of rendered) {
    expect(html.match(/<h1[\s>]/g)?.length).toBe(1);
    expect(html).toContain(`<title>${page.title.replace(/&/g, "&amp;")}</title>`);
    expect(html).toContain(`<link rel="canonical" href="${siteUrl}${page.path}">`);
    expect(html).toContain('<div id="root"><');
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
    expect(JSON.parse(json ?? "")["@graph"].length).toBeGreaterThan(0);
  }
});

test("the sitemap lists every page and robots.txt points to it", () => {
  for (const { path } of pages) expect(sitemap()).toContain(`<loc>${siteUrl}${path}</loc>`);
  expect(robots()).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
});

test("a template without the expected head or root fails loudly", () => {
  expect(() => renderPageHtml("<html></html>", pages[0]!)).toThrow("missing");
});
