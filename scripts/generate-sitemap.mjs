import { writeFileSync } from 'node:fs'
import { ROUTES, SITE_URL } from '../src/data/routes.js'

const urls = ROUTES.map((r) => ({
  loc: `${SITE_URL}${r.path === '/' ? '/' : r.path}`,
  priority: r.path === '/' ? '1.0' : r.path.split('/').length === 2 ? '0.8' : '0.7',
  changefreq: r.path === '/' ? 'daily' : 'weekly',
}))
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}\n</urlset>\n`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml generated: ${urls.length} URLs`)
