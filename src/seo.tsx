// Build-time SEO: prerenders a page into the built HTML template and generates the
// sitemap and robots.txt. Used by build.ts; tested in tests/seo.test.ts.
import { renderToString } from "react-dom/server";
import { PageApp, pages, type Page } from "./pages";
import { services } from "./services";

// Production origin (GitHub Pages custom domain). Canonicals, Open Graph, and the sitemap use it.
export const siteUrl = "https://energ.ee";

const esc = (text: string) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function swap(html: string, pattern: RegExp, replacement: string) {
  if (!pattern.test(html)) throw new Error(`HTML template is missing ${pattern}`);
  return html.replace(pattern, () => replacement);
}

function jsonLd(page: Page) {
  const organization = { "@type": "Organization", name: "Energee", url: siteUrl, address: { "@type": "PostalAddress", addressLocality: "Pittsburgh" } };
  const graph: object[] = [];
  if (page.path === "/") graph.push(organization);
  else {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl + "/" },
        { "@type": "ListItem", position: 2, name: page.crumb, item: siteUrl + page.path },
      ],
    });
    if (services.some(service => service.path === page.path)) {
      graph.push({ "@type": "Service", name: page.crumb, description: page.description, url: siteUrl + page.path, provider: organization });
    }
  }
  // "<" is escaped so the JSON can never close the script tag.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

/** The built index.html with this page's title, description, canonical, social tags, JSON-LD, and prerendered body. */
export function renderPageHtml(template: string, page: Page): string {
  const url = siteUrl + page.path;
  const head = [
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website"><meta property="og:site_name" content="Energee">`,
    `<meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${url}">`,
    `<meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(page.title)}"><meta name="twitter:description" content="${esc(page.description)}">`,
    `<script type="application/ld+json">${jsonLd(page)}</script>`,
  ].join("");
  let html = swap(template, /<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = swap(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(page.description)}">`);
  html = swap(html, /<\/head>/, `${head}</head>`);
  return swap(html, /<div id="root"><\/div>/, `<div id="root">${renderToString(<PageApp page={page} />)}</div>`);
}

export const sitemap = () =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `<url><loc>${siteUrl + page.path}</loc></url>`).join("\n")}\n</urlset>\n`;

export const robots = () => `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
