<script setup lang="ts">
// Text as chunky pixel letters with an offset outline (Claude Code banner style), drawn as a static SVG
// so it costs no font or image request and stays crisp at any width.
const props = defineProps<{ text: string }>()

const CELL = 10
const OFFSET = 3

const layout = computed(() => {
  const { cells, columns, rows } = pixelLayout(props.text)
  return {
    cells: cells.map(({ x, y }) => ({ x: x * CELL, y: y * CELL })),
    width: columns * CELL + OFFSET + 1,
    height: rows * CELL + OFFSET + 1,
  }
})
</script>

<template>
  <svg
    class="pixel-banner"
    :viewBox="`0 0 ${layout.width} ${layout.height}`"
    :width="layout.width"
    :height="layout.height"
    role="img"
    :aria-label="text"
    shape-rendering="crispEdges"
  >
    <g class="shadow">
      <rect
        v-for="cell in layout.cells"
        :key="`s${cell.x}-${cell.y}`"
        :x="cell.x + OFFSET + 0.5"
        :y="cell.y + OFFSET + 0.5"
        :width="CELL - 1"
        :height="CELL - 1"
      />
    </g>
    <g class="face">
      <rect
        v-for="cell in layout.cells"
        :key="`f${cell.x}-${cell.y}`"
        :x="cell.x"
        :y="cell.y"
        :width="CELL - 1"
        :height="CELL - 1"
      />
    </g>
  </svg>
</template>

<style scoped>
.pixel-banner {
  width: 100%;
  max-width: 480px;
  height: auto;
}

.shadow rect {
  fill: none;
  stroke: var(--color-pixel-shadow);
  stroke-width: 1;
}

.face rect {
  fill: var(--color-accent);
}
</style>
