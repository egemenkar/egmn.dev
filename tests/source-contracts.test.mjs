import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { test } from 'node:test'

const read = (path) => {
  assert.ok(existsSync(path), `${path} should exist`)
  return readFileSync(path, 'utf8')
}

const sourceFiles = [
  'app.vue',
  'error.vue',
  ...readdirSync('components').map(file => `components/${file}`),
  'pages/index.vue',
  'pages/writing/index.vue',
  'data/profile.ts',
]

test('global tokens keep the warm base, green accent, dark mode and reduced motion', () => {
  const css = read('assets/css/main.css')

  assert.match(read('nuxt.config.ts'), /assets\/css\/main\.css/)
  assert.match(css, /--color-page:\s*#f7f5f0/i)
  assert.match(css, /--color-accent:\s*#1f3a34/i)
  assert.match(css, /prefers-color-scheme: dark/)
  assert.match(css, /data-theme="dark"/)
  assert.match(css, /prefers-reduced-motion/)
  assert.match(css, /:focus-visible/)
})

test('the monospace font is self-hosted and preloaded', () => {
  const css = read('assets/css/main.css')

  for (const file of ['jetbrains-mono-latin-wght-normal.woff2', 'jetbrains-mono-latin-ext-wght-normal.woff2']) {
    assert.ok(existsSync(`public/fonts/${file}`), file)
    assert.match(css, new RegExp(file.replace(/\./g, '\\.')))
  }
  assert.match(read('app.vue'), /rel: 'preload', href: '\/fonts\/jetbrains-mono-latin-wght-normal\.woff2'/)
  assert.doesNotMatch(read('nuxt.config.ts'), /fonts\.googleapis/)
})

test('home page is the terminal: banner, tablist menu and one panel per section', () => {
  const home = read('components/TerminalHome.vue')

  assert.match(read('pages/index.vue'), /<TerminalHome/)
  assert.match(home, /<PixelBanner/)
  assert.match(home, /role="tablist"/)
  assert.match(home, /aria-orientation="vertical"/)
  assert.match(home, /role="tab"/)
  assert.match(home, /:aria-selected=/)
  assert.match(home, /role="tabpanel"/)
  assert.match(home, /:hidden="index !== active"/)
  assert.match(home, /ArrowDown/)
  assert.match(home, /ArrowUp/)
})

test('the prompt runs slash commands with accessible suggestions and a zsh-style miss', () => {
  const prompt = read('components/CommandPrompt.vue')

  assert.match(read('components/TerminalHome.vue'), /<CommandPrompt/)
  assert.match(prompt, /role="combobox"/)
  assert.match(prompt, /role="listbox"/)
  assert.match(prompt, /role="option"/)
  assert.match(prompt, /aria-activedescendant/)
  assert.match(prompt, /<label[\s\S]*for="command-input"/)
  assert.match(prompt, /zsh: command not found/)
  assert.match(prompt, /Type \/ to see available commands\./)
  for (const command of ['/theme', '/help', '/clear']) assert.match(prompt, new RegExp(command))
})

test('without JavaScript every panel is shown instead of the menu', () => {
  assert.match(read('app.vue'), /classList\.add\('js'\)/)
  assert.match(read('components/TerminalHome.vue'), /:root:not\(\.js\) \.panel\[hidden\]/)
})

test('landmarks and controls are reachable by keyboard', () => {
  assert.match(read('layouts/default.vue'), /class="skip-link"\s+href="#main-content"/)
  assert.match(read('layouts/default.vue'), /id="main-content"/)
  assert.match(read('components/ThemeToggle.vue'), /aria-pressed/)
  assert.match(read('components/TerminalHome.vue'), /:tabindex="index === active \? 0 : -1"/)
})

test('writing stays hidden without posts', () => {
  assert.match(read('data/profile.ts'), /key !== 'writing' \|\| posts\.length > 0/)
  assert.match(read('pages/writing/index.vue'), /if \(!posts\.length\)[\s\S]*statusCode: 404/)
  assert.match(read('server/routes/sitemap.xml.ts'), /posts\.length \?/)
})

test('components take career copy from the content file, not hard-coded strings', () => {
  for (const path of sourceFiles.filter(path => path.startsWith('components/'))) {
    const source = read(path)
    assert.doesNotMatch(source, /The Despatch Company|RIGHTYON|Selçuk|egemenkar@gmail/, `${path} hard-codes career content`)
  }
})

test('SEO metadata, structured data and crawl files are present', () => {
  const app = read('app.vue')

  assert.match(app, /twitterCard: 'summary_large_image'/)
  assert.match(app, /ogImage/)
  assert.match(app, /'@type': 'Person'/)
  assert.match(app, /'jobTitle'/)
  assert.match(app, /'worksFor'/)
  assert.match(app, /'sameAs': \[links\.linkedin\.href, links\.github\.href\]/)
  assert.match(read('public/robots.txt'), /Sitemap: https:\/\/egmn\.dev\/sitemap\.xml/)
  assert.ok(existsSync('server/routes/sitemap.xml.ts'))

  const og = readFileSync('public/og-image.png')
  assert.equal(og.readUInt32BE(16), 1200)
  assert.equal(og.readUInt32BE(20), 630)
})

test('the public CV is a real PDF built from source without a phone number', () => {
  const pdf = readFileSync('public/egemen-kar-cv.pdf')
  assert.equal(pdf.subarray(0, 4).toString(), '%PDF')
  assert.ok(statSync('public/egemen-kar-cv.pdf').size < 500 * 1024)
  assert.doesNotMatch(read('cv/cv.html'), /\+90|tel:/)
})

test('indie app and maker positioning is gone from the source', () => {
  const banned = /app maker|independent maker|indie|fomo fast|rostershift|flickmark|waitlist|app store|pricing|build\. ship/i

  for (const path of sourceFiles) assert.doesNotMatch(read(path), banned, path)
  assert.ok(!existsSync('public/images/projects'), 'project screenshots should be removed')
})
