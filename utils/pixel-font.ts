// 5x5 block letters for the pixel banner, OG image and favicon. Add glyphs here as new letters are needed.
const GLYPHS: Record<string, string[]> = {
  'A': ['01110', '10001', '11111', '10001', '10001'],
  'E': ['11111', '10000', '11110', '10000', '11111'],
  'G': ['01111', '10000', '10011', '10001', '01111'],
  'K': ['10001', '10010', '11100', '10010', '10001'],
  'M': ['10001', '11011', '10101', '10001', '10001'],
  'N': ['10001', '11001', '10101', '10011', '10001'],
  'R': ['11110', '10001', '11110', '10010', '10001'],
  ' ': ['00', '00', '00', '00', '00'],
}

export interface PixelLayout {
  cells: { x: number, y: number }[]
  columns: number
  rows: number
}

// Lays text out on a grid (one unit per pixel, one blank column between letters).
export function pixelLayout(text: string): PixelLayout {
  const cells: PixelLayout['cells'] = []
  let column = 0
  for (const char of text.toUpperCase()) {
    const glyph = GLYPHS[char] ?? GLYPHS[' ']!
    glyph.forEach((row, y) => {
      ;[...row].forEach((bit, x) => {
        if (bit === '1') cells.push({ x: column + x, y })
      })
    })
    column += glyph[0]!.length + 1
  }
  return { cells, columns: column - 1, rows: 5 }
}

// Standalone SVG markup: solid face pixels over an offset outline, as in the site banner.
export function pixelSvg(text: string, { cell = 10, offset = 3, face = '#1f3a34', shadow = '#b5c8c0', background = '' } = {}): string {
  const { cells, columns, rows } = pixelLayout(text)
  const width = columns * cell + offset + 1
  const height = rows * cell + offset + 1
  const outline = cells.map(({ x, y }) => `<rect x="${x * cell + offset + 0.5}" y="${y * cell + offset + 0.5}" width="${cell - 1}" height="${cell - 1}"/>`).join('')
  const solid = cells.map(({ x, y }) => `<rect x="${x * cell}" y="${y * cell}" width="${cell - 1}" height="${cell - 1}"/>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" shape-rendering="crispEdges">${background}<g fill="none" stroke="${shadow}">${outline}</g><g fill="${face}">${solid}</g></svg>`
}
