<script setup lang="ts">
const { isDark, sync, toggle } = useTheme()

onMounted(sync)
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    aria-label="Dark theme"
    :aria-pressed="isDark"
    @click="toggle"
  >
    <svg
      class="icon-moon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <path
        d="M20.3 15.4A8.7 8.7 0 0 1 8.6 3.7 8.8 8.8 0 1 0 20.3 15.4Z"
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="1.6"
      />
    </svg>
    <svg
      class="icon-sun"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
      />
      <path
        d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.6"
      />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: grid;
  width: 44px;
  height: 44px;
  flex: none;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  transition: color 150ms ease, background-color 150ms ease;
}

.theme-toggle:hover {
  background: var(--color-surface);
  color: var(--color-accent);
}

/* Icon follows the effective theme purely in CSS, so it is right before hydration too. */
.icon-sun {
  display: none;
}

:root[data-theme="dark"] .icon-moon {
  display: none;
}

:root[data-theme="dark"] .icon-sun {
  display: block;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .icon-moon {
    display: none;
  }

  :root:not([data-theme="light"]) .icon-sun {
    display: block;
  }
}
</style>
