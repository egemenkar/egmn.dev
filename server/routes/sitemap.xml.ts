import { posts, site } from '~/data/profile'

// Prerendered to a static sitemap.xml at build time. /writing is listed only once posts exist.
export default defineEventHandler(() => {
  const urls = [
    { loc: `${site.url}/`, lastmod: undefined as string | undefined },
    ...(posts.length ? [{ loc: `${site.url}/writing`, lastmod: posts[0]?.date }] : []),
  ]

  const body = urls
    .map(({ loc, lastmod }) => `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
})
