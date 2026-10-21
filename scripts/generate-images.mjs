// Regenerates the Open Graph card and raster favicons from data/profile.ts.
// Run with `npm run images` after changing the name or headline; outputs are committed to public/.
// Requires a local Chrome/Chromium (set CHROME_PATH to override the macOS default).
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { person, site } from '../data/profile.ts'
import { pixelLayout, pixelSvg } from '../utils/pixel-font.ts'

const root = resolve(import.meta.dirname, '..')
const publicDir = join(root, 'public')
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const work = mkdtempSync(join(tmpdir(), 'egmn-images-'))

const font = file => pathToFileURL(join(publicDir, 'fonts', file)).href
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function screenshot(html, width, height, out) {
  const page = join(work, `${width}x${height}.html`)
  writeFileSync(page, html)
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${width},${height}`,
    '--virtual-time-budget=2000',
    `--screenshot=${out}`,
    pathToFileURL(page).href,
  ], { stdio: 'ignore' })
}

const fontFaces = `
  @font-face { font-family: Mono; src: url(${font('jetbrains-mono-latin-wght-normal.woff2')}); font-weight: 100 800; }
`

const [headlineRole, headlineFocus] = person.headline.split(' | ')
const banner = pixelSvg(person.name, { cell: 16, offset: 5, face: '#9cc3b4', shadow: '#3e5f55' })

// Social card: the home page's terminal window, dark.
const ogHtml = `<!doctype html><meta charset="utf-8"><style>${fontFaces}
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #0f100f; }
  body { box-sizing: border-box; padding: 40px; font: 400 26px/1.5 Mono; color: #e4e3dc; }
  .window { box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; height: 100%; padding: 44px 56px; border: 2px solid #2c2f2b; border-radius: 18px; background: #161816; }
  .welcome { align-self: flex-start; margin: 0 0 44px; padding: 4px 18px; border: 2px solid #4f7a6c; border-radius: 10px; font-size: 24px; }
  .welcome b { color: #9cc3b4; }
  svg { display: block; width: 980px; height: auto; }
  .role { margin: 40px 0 0; font-weight: 700; color: #9cc3b4; }
  .muted { margin: 4px 0 0; color: #9a9d95; }
</style>
<div class="window">
  <p class="welcome"><b>*</b> Welcome to <b>${new URL(site.url).host}</b></p>
  ${banner}
  <p class="role">${escape(headlineRole)} <span style="color:#9a9d95;font-weight:400">|</span> <span style="color:#e4e3dc;font-weight:400">${escape(headlineFocus)}</span></p>
  <p class="muted">${escape(person.subline)} · ${escape(person.location)}</p>
</div>`

screenshot(ogHtml, 1200, 630, join(publicDir, 'og-image.png'))

const iconSvg = pixelSvg('EK', { cell: 10, offset: 0, face: '#f7f5f0', shadow: 'none' })
const iconHtml = size => `<!doctype html><meta charset="utf-8"><style>
  html, body { margin: 0; width: ${size}px; height: ${size}px; overflow: hidden; background: #1f3a34; }
  body { display: grid; place-items: center; }
  svg { width: ${Math.round(size * 0.72)}px; height: auto; }
</style>${iconSvg}`

const icons = {
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  'favicon-32x32.png': 32,
  'favicon-16x16.png': 16,
}
for (const [file, size] of Object.entries(icons)) screenshot(iconHtml(size), size, size, join(publicDir, file))

// favicon.ico: an ICO container holding the 16 and 32 px PNGs as-is.
const entries = [16, 32].map(size => ({ size, data: readFileSync(join(publicDir, `favicon-${size}x${size}.png`)) }))
const header = Buffer.alloc(6 + 16 * entries.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(entries.length, 4)
let offset = header.length
entries.forEach(({ size, data }, i) => {
  const base = 6 + 16 * i
  header.writeUInt8(size, base)
  header.writeUInt8(size, base + 1)
  header.writeUInt16LE(1, base + 4)
  header.writeUInt16LE(32, base + 6)
  header.writeUInt32LE(data.length, base + 8)
  header.writeUInt32LE(offset, base + 12)
  offset += data.length
})
writeFileSync(join(publicDir, 'favicon.ico'), Buffer.concat([header, ...entries.map(({ data }) => data)]))

// Vector favicon: the same pixel monogram centred on the accent square.
const mark = pixelLayout('EK')
const side = mark.columns + 4
const pixels = mark.cells.map(({ x, y }) => `<rect x="${x + 2}" y="${y + (side - mark.rows) / 2}" width="1" height="1"/>`).join('')
writeFileSync(join(publicDir, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" shape-rendering="crispEdges"><title>Egemen Kar</title><rect width="${side}" height="${side}" rx="2" fill="#1f3a34"/><g fill="#f7f5f0">${pixels}</g></svg>\n`)

rmSync(work, { recursive: true, force: true })
console.log('Generated og-image.png, favicons and favicon.ico in public/')
