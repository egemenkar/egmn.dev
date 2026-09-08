<script setup>
defineProps({
  project: { type: Object, required: true },
});
</script>

<template>
  <span class="project-icon-reveal" :data-project-icon="project.id">
    <svg
      v-if="project.id === 'fomo-fast'"
      class="project-icon-doodle"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="M32 12c11 0 20 9 20 20s-9 20-20 20-20-9-20-20c0-8 5-15 12-18" />
        <path d="M32 19v13l9-7M27 8h10M32 8v4" />
        <path d="M19 42c4 4 9 6 14 6" />
      </g>
    </svg>

    <svg
      v-else-if="project.id === 'rostershift'"
      class="project-icon-doodle"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="M14 18h36v34H14zM14 27h36M23 12v11M41 12v11" />
        <path d="m21 35 2 2 4-5M34 34h4M43 34h2M21 44h4M34 44h4M43 44h2" />
      </g>
    </svg>

    <svg
      v-else
      class="project-icon-doodle"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="M13 25h38v28H13zM13 25l4-12 38 9-4 3" />
        <path d="m22 14 5 9M34 17l5 8M46 20l4 5M28 33v13l11-6.5-11-6.5Z" />
      </g>
    </svg>

    <img
      class="project-icon-real"
      :src="project.icon"
      :alt="project.iconAlt"
      width="88"
      height="88"
      loading="lazy"
    />
  </span>
</template>

<style scoped>
.project-icon-reveal {
  position: relative;
  display: block;
  isolation: isolate;
  overflow: hidden;
  background: var(--color-surface);
  color: var(--color-foreground);
}

.project-icon-doodle,
.project-icon-real {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transition: opacity 180ms ease, transform 180ms ease;
}

.project-icon-doodle {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid var(--color-divider);
  opacity: 0.76;
  transform: rotate(-2deg) scale(0.94);
}

[data-project-icon="rostershift"] .project-icon-doodle {
  transform: rotate(1.5deg) scale(0.93);
}

[data-project-icon="flickmark"] .project-icon-doodle {
  transform: rotate(-1deg) scale(0.94);
}

.project-icon-real {
  object-fit: cover;
  opacity: 0;
  transform: rotate(3deg) scale(0.88);
}

:global(.project-row:hover .project-icon-doodle),
:global(.project-row:focus-within .project-icon-doodle),
:global(.project-item:hover .project-icon-doodle),
:global(.project-item:focus-within .project-icon-doodle) {
  opacity: 0;
  transform: rotate(-3deg) scale(1.06);
}

:global(.project-row:hover .project-icon-real),
:global(.project-row:focus-within .project-icon-real),
:global(.project-item:hover .project-icon-real),
:global(.project-item:focus-within .project-icon-real) {
  opacity: 1;
  transform: none;
}
</style>
