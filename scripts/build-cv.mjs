// Prints cv/cv.html to public/egemen-kar-cv.pdf (the public CV: no phone number).
// Run with `npm run cv` after editing cv/cv.html. Requires a local Chrome (CHROME_PATH overrides the macOS default).
import { execFileSync } from 'node:child_process'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const out = join(root, 'public', 'egemen-kar-cv.pdf')

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${out}`,
  pathToFileURL(join(root, 'cv', 'cv.html')).href,
], { stdio: 'ignore' })

console.log(`Wrote ${out}`)
