<script setup lang="ts">
import { person } from '~/data/profile'

// Captured at prerender time and carried in the payload so hydration matches.
const year = useState('footer-year', () => new Date().getFullYear())

// Title bar reads like a shell session: user@host and the current "directory".
const route = useRoute()
const title = computed(() => `egemen@egmn.dev: ~${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`)
</script>

<template>
  <div class="desktop">
    <a
      class="skip-link"
      href="#main-content"
    >Skip to content</a>

    <div class="terminal-window">
      <div
        class="titlebar"
        aria-hidden="true"
      >
        <span class="title">{{ title }} — zsh</span>
      </div>

      <main
        id="main-content"
        class="screen"
        tabindex="0"
        aria-label="Terminal"
      >
        <div class="screen-inner">
          <slot />
        </div>
      </main>

      <footer class="statusbar muted">
        <p
          class="keys"
          aria-hidden="true"
        >
          ↑↓ navigate · / commands
        </p>
        <p class="statusbar-end">
          <span>© {{ year }} {{ person.name }}</span>
          <ThemeToggle />
        </p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* The window fills the viewport (a small desktop margin on larger screens, edge to edge on phones). */
.desktop {
  display: flex;
  height: 100dvh;
  padding: 0;
}

.terminal-window {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-panel);
}

.titlebar {
  position: relative;
  display: flex;
  height: 36px;
  flex: none;
  align-items: center;
  justify-content: center;
  padding-inline: 16px;
  border-bottom: 1px solid var(--color-rule);
  background: var(--color-chrome);
  color: var(--color-muted);
  font-size: 0.75rem;
  user-select: none;
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.screen {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-color: var(--color-rule) transparent;
  scrollbar-width: thin;
}

.screen:focus {
  outline: none;
}

.screen:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -2px;
}

/* Left-aligned like a real terminal; the cap only keeps lines readable on very wide screens. */
.screen-inner {
  max-width: 100ch;
  padding: 20px 16px 28px;
}

.statusbar {
  display: flex;
  height: 40px;
  flex: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-inline: 16px 4px;
  border-top: 1px solid var(--color-rule);
  background: var(--color-chrome);
  font-size: 0.75rem;
}

.statusbar-end {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

/* Keyboard hints mean nothing on touch screens, and nothing without JavaScript. */
@media (hover: none) and (pointer: coarse) {
  .keys {
    visibility: hidden;
  }
}

:root:not(.js) .keys {
  visibility: hidden;
}

@media (min-width: 640px) {
  .desktop {
    padding: 20px;
  }

  .terminal-window {
    border: 1px solid var(--color-rule);
    border-radius: 12px;
    box-shadow: 0 24px 60px -24px rgb(0 0 0 / 0.28);
  }

  .screen-inner {
    padding: 32px 40px 40px;
  }

  .statusbar {
    padding-inline: 20px 8px;
  }
}

@media (min-width: 1100px) {
  .screen-inner {
    max-width: none;
  }
}

@media (min-width: 1200px) {
  .desktop {
    padding: 32px 40px;
  }
}
</style>
