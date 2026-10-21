/**
 * generate-sitemap.js
 * Reads project slugs from src/data/projects.js and writes public/sitemap.xml.
 * Run: node scripts/generate-sitemap.js
 * Integrated into the build via "prebuild" in package.json.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = resolve(__dir, '..')

// ── Parse slugs from the projects data file without importing it
// (avoids setting up a full JS module evaluation environment)
const projectsSource = readFileSync(resolve(root, 'src/data/projects.js'), 'utf8')
const slugMatches    = [...projectsSource.matchAll(/slug:\s*'([^']+)'/g)]
const slugs          = slugMatches.map((m) => m[1])

const BASE = 'https://theredbricks.in'
const now  = new Date().toISOString().split('T')[0] // YYYY-MM-DD

// Static routes — includes all human-navigable pages
const staticRoutes = [
  { loc: '/',                    changefreq: 'weekly',  priority: '1.0' },
  { loc: '/projects/',           changefreq: 'weekly',  priority: '0.9' },
  { loc: '/delivered-projects/', changefreq: 'monthly', priority: '0.8' },
  { loc: '/about-us/',           changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/',           changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact-us/',         changefreq: 'monthly', priority: '0.6' },
]

// Dynamic project routes
const projectRoutes = slugs.map((slug) => ({
  loc:        `/projects/${slug}/`,
  changefreq: 'monthly',
  priority:   '0.8',
}))

const allRoutes = [...staticRoutes, ...projectRoutes]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(({ loc, changefreq, priority }) => `  <url>
    <loc>${BASE}${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`

const outDir = resolve(root, 'public')
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'sitemap.xml'), xml, 'utf8')

console.log(`✓ sitemap.xml written — ${allRoutes.length} URLs`)
slugs.forEach((s) => console.log(`  /projects/${s}/`))
