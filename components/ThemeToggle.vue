<script setup>
const { t } = useI18n();
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const label = computed(() =>
  isDark.value ? t("theme.switchToLight") : t("theme.switchToDark"),
);

const toggleTheme = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<template>
  <button
    class="theme-toggle focus-ring"
    type="button"
    :aria-label="label"
    :aria-pressed="isDark"
    :title="label"
    @click="toggleTheme"
  >
    <svg v-if="isDark" aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7" />
      <path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3M4.8 4.8l2.1 2.1M17.1 17.1l2.1 2.1M19.2 4.8l-2.1 2.1M6.9 17.1l-2.1 2.1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.7" />
    </svg>
    <svg v-else aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
      <path d="M20.3 15.4A8.7 8.7 0 0 1 8.6 3.7 8.8 8.8 0 1 0 20.3 15.4Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.7" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: grid;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: color 160ms ease, background-color 160ms ease;
}

.theme-toggle:hover {
  background: var(--color-surface);
  color: var(--color-accent);
}
</style>
