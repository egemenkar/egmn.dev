<script setup>
import { contact, socialLinks } from "~/data/site.mjs";
</script>

<template>
  <footer id="contact" class="contact-footer" aria-labelledby="contact-title">
    <div class="contact-top">
      <div>
        <h2 id="contact-title">Have something in mind?</h2>
        <a class="contact-link" :href="`mailto:${contact.email}`">Let’s talk ↗</a>
      </div>
      <p class="contact-note" aria-hidden="true">Good ideas<br />in better<br />company.</p>
    </div>

    <div class="contact-bottom">
      <nav aria-label="Social links">
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
  margin: 0 26px 0 0;
  color: var(--color-muted);
  font-family: cursive;
  font-size: 0.95rem;
  line-height: 1.2;
  transform: rotate(-8deg);
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

  .contact-note {
    display: none;
  }

  .contact-bottom {
    align-items: flex-start;
    flex-direction: column;
    margin-top: 42px;
  }
}
</style>
