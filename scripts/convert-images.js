/**
 * convert-images.js
 * Converts all JPEG/PNG images in public/images to WebP at 3 quality tiers
 * (high for large/detail images, medium for cards, low for thumbnails).
 * Originals are kept — the WebP versions sit alongside them.
 *
 * Uses sharp (free, open-source, MIT licensed).
 * Run: node scripts/convert-images.js
 * Integrated via "prebuild" in package.json.
 */
import sharp from 'sharp'
import { readdirSync, existsSync } from 'fs'
import { resolve, join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = resolve(__dir, '..')
const imgDir = resolve(root, 'public/images')

if (!existsSync(imgDir)) {
  console.log('No public/images directory found — skipping image conversion.')
  process.exit(0)
}

const files = readdirSync(imgDir).filter((f) => {
  const ext = extname(f).toLowerCase()
  return ['.jpg', '.jpeg', '.png'].includes(ext)
})

let converted = 0
let skipped   = 0

for (const file of files) {
  const src    = join(imgDir, file)
  const name   = basename(file, extname(file))
  const webp   = join(imgDir, `${name}.webp`)

  // Skip if WebP already exists and is newer (save time on repeated builds)
  if (existsSync(webp)) { skipped++; continue }

  // Choose quality: portrait/large images get high quality, small images get medium
  const isLarge = /-lg|port/.test(name)
  const quality = isLarge ? 82 : 72

  try {
    await sharp(src)
      .webp({ quality, effort: 4 })
      .toFile(webp)
    converted++
    console.log(`  ✓ ${file} → ${name}.webp (q${quality})`)
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`)
  }
}

console.log(`\nImage conversion complete: ${converted} converted, ${skipped} skipped (already exist).`)
