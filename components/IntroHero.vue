<script setup>
import { contact } from "~/data/site.mjs";
</script>

<template>
  <section class="intro-hero" aria-labelledby="intro-title">
    <div class="portrait-column">
      <div class="portrait-wrap">
        <img
          class="portrait"
          src="/images/profile.jpg"
          :alt="$t('home.hero.portraitAlt')"
          width="512"
          height="512"
          loading="eager"
          fetchpriority="high"
        />
        <svg class="portrait-star" aria-hidden="true" viewBox="0 0 48 48">
          <path d="m24 4 4.5 14.7L44 17l-12.4 9.2L37 41 24 32.3 11 41l5.4-14.8L4 17l15.5 1.7L24 4Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="3" />
        </svg>
      </div>
      <p class="portrait-note" aria-hidden="true">{{ $t("home.hero.note") }}</p>
    </div>

    <div class="intro-copy">
      <h1 id="intro-title">{{ $t("home.hero.title") }}<span class="accent">.</span></h1>
      <p class="intro-lead">{{ $t("home.hero.intro") }}</p>
      <p class="intro-role">{{ $t("home.hero.role") }}</p>
      <div class="intro-links">
        <a class="text-link" href="#about">{{ $t("home.hero.aboutLink") }}</a>
        <a class="text-link" :href="`mailto:${contact.email}`">{{ $t("home.hero.contactLink") }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro-hero {
  display: grid;
  grid-template-columns: minmax(270px, 0.8fr) minmax(0, 1.5fr);
  gap: clamp(48px, 7vw, 86px);
  align-items: center;
  padding-block: 70px 86px;
  border-bottom: 1px solid var(--color-divider);
}

.portrait-column {
  position: relative;
}

.portrait-wrap {
  position: relative;
  width: min(100%, 330px);
}

.portrait-wrap::before {
  position: absolute;
  inset: 10% -4% -5% 8%;
  border: 1px solid var(--color-divider);
  border-radius: 48% 52% 45% 55% / 54% 46% 54% 46%;
  content: "";
  transform: rotate(-3deg);
}

.portrait {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 47% 53% 45% 55% / 54% 43% 57% 46%;
  object-fit: cover;
  box-shadow: 0 12px 30px color-mix(in srgb, var(--color-text) 11%, transparent);
}

.portrait-star {
  position: absolute;
  top: 12%;
  right: -28px;
  width: 44px;
  color: var(--color-decorative);
  transform: rotate(9deg);
}

.portrait-note {
  position: absolute;
  right: -8px;
  bottom: -48px;
  margin: 0;
  color: var(--color-muted);
  font-family: cursive;
  font-size: 1rem;
  transform: rotate(-4deg);
  white-space: nowrap;
}

h1 {
  margin: 0;
  font-size: clamp(3.7rem, 5.6vw, 4.7rem);
  font-weight: 850;
  letter-spacing: -0.072em;
  line-height: 0.94;
  text-wrap: balance;
}

.accent {
  color: var(--color-decorative);
}

.intro-lead {
  max-width: 610px;
  margin: 28px 0 4px;
  font-size: clamp(1.12rem, 2vw, 1.3rem);
  letter-spacing: -0.025em;
  line-height: 1.45;
}

.intro-role {
  margin: 0;
  color: var(--color-muted);
  font-size: 1rem;
}

.intro-links {
  display: flex;
  gap: 36px;
  margin-top: 25px;
}

@media (max-width: 1023px) {
  .intro-hero {
    grid-template-columns: minmax(220px, 0.75fr) minmax(0, 1.35fr);
    gap: 46px;
  }

  h1 {
    font-size: clamp(3.2rem, 6.5vw, 4rem);
  }
}

@media (max-width: 767px) {
  .intro-hero {
    grid-template-columns: 1fr;
    gap: 28px;
    padding-block: 38px 54px;
  }

  .portrait-wrap {
    width: 146px;
  }

  .portrait-star {
    right: -34px;
    width: 34px;
  }

  .portrait-note {
    display: none;
  }

  h1 {
    font-size: clamp(2.55rem, 12vw, 3.35rem);
    letter-spacing: -0.062em;
    line-height: 0.98;
  }

  .intro-lead {
    margin-top: 22px;
    font-size: 1.08rem;
  }

  .intro-links {
    flex-wrap: wrap;
    gap: 6px 26px;
    margin-top: 20px;
  }
}
</style>
