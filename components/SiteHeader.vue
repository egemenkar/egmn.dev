<script setup>
const route = useRoute();

const toSection = (hash) => (route.path === "/" ? hash : `/${hash}`);
const links = [
  { label: "Work", hash: "#work" },
  { label: "About", hash: "#about" },
  { label: "Contact", hash: "#contact" },
];
</script>

<template>
  <header class="site-header">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="page-container header-inner">
      <NuxtLink class="wordmark focus-ring" to="/" aria-label="egmn.dev home">
        egmn<span aria-hidden="true">.</span>
      </NuxtLink>

      <div class="header-actions">
        <nav aria-label="Primary navigation">
          <ul class="nav-list">
            <li v-for="link in links" :key="link.hash">
              <NuxtLink class="nav-link focus-ring" :to="toSection(link.hash)">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  padding-block: 24px;
}

.header-inner,
.header-actions,
.nav-list {
  display: flex;
  align-items: center;
}

.header-inner {
  justify-content: space-between;
  min-height: 48px;
}

.header-actions {
  gap: 26px;
}

.wordmark {
  color: var(--color-text);
  font-size: 1.45rem;
  font-weight: 850;
  letter-spacing: -0.055em;
  line-height: 1;
  text-decoration: none;
}

.wordmark span {
  color: var(--color-decorative);
}

.nav-list {
  gap: 30px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  text-decoration: none;
  transition: color 160ms ease;
}

.nav-link:hover {
  color: var(--color-accent);
}

@media (max-width: 767px) {
  .site-header {
    padding-block: 12px;
  }

  .header-actions {
    gap: 6px;
  }

  .nav-list {
    gap: 2px;
  }

  .nav-link {
    padding-inline: 6px;
    font-size: 0.67rem;
  }

  .wordmark {
    font-size: 1.2rem;
  }
}

@media (max-width: 359px) {
  .nav-link {
    padding-inline: 4px;
    font-size: 0.62rem;
  }
}
</style>
