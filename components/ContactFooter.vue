<script setup>
import { contact, socialLinks } from "~/data/site.mjs";
</script>

<template>
  <footer id="contact" class="contact-footer" aria-labelledby="contact-title">
    <div class="contact-top">
      <div>
        <h2 id="contact-title">{{ $t("home.contact.heading") }}</h2>
        <a class="contact-link" :href="`mailto:${contact.email}`">{{ $t("home.contact.link") }}</a>
      </div>
      <div class="contact-note" aria-hidden="true">
        <span class="contact-note-copy">
          <span>{{ $t("home.contact.noteLineOne") }}</span>
          <span>{{ $t("home.contact.noteLineTwo") }}</span>
        </span>
        <svg class="sailboat-doodle" viewBox="0 0 140 78">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8">
            <path d="M69 12v39M65 18 38 48h27V18ZM73 23l25 25H73V23Z" />
            <path class="doodle-accent" d="M69 13c8-6 14-4 19 0-8 0-13 2-19 5" />
            <path d="M29 53c25 4 53 4 80 0l-11 12c-18 5-40 5-58 0L29 53Z" />
            <path d="M14 72c8-5 15-5 23 0 8 5 15 5 23 0 8-5 15-5 23 0 8 5 15 5 23 0 7-5 14-5 21 0" />
          </g>
        </svg>
      </div>
    </div>

    <div class="contact-bottom">
      <nav :aria-label="$t('home.contact.socialLabel')">
        <ul>
          <li v-for="link in socialLinks" :key="link.label">
            <a
              :href="link.url"
              :target="link.url.startsWith('http') ? '_blank' : undefined"
              :rel="link.url.startsWith('http') ? 'noopener noreferrer' : undefined"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>
      <p class="location">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
          <path d="M20 10c0 5.2-8 12-8 12S4 15.2 4 10a8 8 0 1 1 16 0Z" fill="none" stroke="currentColor" stroke-width="1.6" />
          <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="1.6" />
        </svg>
        {{ contact.location }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.contact-footer {
  padding-block: 46px 34px;
  border-top: 1px solid var(--color-divider);
}

.contact-top,
.contact-bottom,
.contact-bottom ul,
.location {
  display: flex;
  align-items: center;
}

.contact-top,
.contact-bottom {
  justify-content: space-between;
  gap: 32px;
}

h2 {
  margin: 0;
  font-size: clamp(1.75rem, 3.6vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 1.1;
}

.contact-link {
  display: inline-block;
  margin-top: 4px;
  border-bottom: 2px solid currentColor;
  color: var(--color-decorative);
  font-size: clamp(1.7rem, 3.6vw, 2.35rem);
  font-weight: 780;
  letter-spacing: -0.05em;
  line-height: 1.2;
  text-decoration: none;
}

.contact-link:hover {
  color: var(--color-accent);
}

.contact-note {
  display: grid;
  width: 170px;
  justify-items: center;
  margin: 0 18px 0 0;
  color: var(--color-muted);
  font-family: cursive;
  font-size: 1rem;
  line-height: 1.2;
  transform: rotate(-4deg);
}

.contact-note-copy {
  display: grid;
  justify-items: center;
}

.contact-note-copy span {
  white-space: nowrap;
}

.sailboat-doodle {
  width: 116px;
  height: auto;
  margin-top: 4px;
  overflow: visible;
}

.doodle-accent {
  stroke: var(--color-decorative);
}

.contact-bottom {
  margin-top: 50px;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.contact-bottom ul {
  flex-wrap: wrap;
  gap: 26px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.contact-bottom a {
  text-underline-offset: 4px;
}

.contact-bottom a:hover {
  color: var(--color-accent);
}

.location {
  gap: 8px;
  margin: 0;
}

@media (max-width: 767px) {
  .contact-footer {
    padding-block: 38px 28px;
  }

  .contact-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 28px;
  }

  .contact-note {
    align-self: flex-end;
    margin-right: 4px;
  }

  .contact-bottom {
    align-items: flex-start;
    flex-direction: column;
    margin-top: 42px;
  }
}
</style>
