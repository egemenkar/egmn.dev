<script setup>
import { experience } from "~/data/site.mjs";

const summaryExperience = experience.slice(0, 3);
</script>

<template>
  <section id="about" class="about-summary" aria-labelledby="about-title">
    <p class="section-label">02 / A little about me</p>
    <h2 id="about-title">
      I lead frontend teams, build my own products, and share what I learn along the way.
    </h2>

    <div class="experience-list">
      <article v-for="item in summaryExperience" :key="`${item.company}-${item.role}`" class="experience-row">
        <h3>{{ item.company }}</h3>
        <p>{{ item.role }}</p>
        <time>{{ item.period }}</time>
      </article>
    </div>

    <NuxtLink class="text-link background-link" to="/about">Full background ↗</NuxtLink>
  </section>
</template>

<style scoped>
.about-summary {
  padding-block: 58px 74px;
}

h2 {
  max-width: 830px;
  margin: 30px 0 42px;
  font-size: clamp(2.1rem, 4.2vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.058em;
  line-height: 1.07;
}

.experience-list {
  border-top: 1px solid var(--color-divider);
}

.experience-row {
  display: grid;
  grid-template-columns: 1fr 1.4fr auto;
  gap: 28px;
  align-items: baseline;
  padding-block: 20px;
  border-bottom: 1px solid var(--color-divider);
}

.experience-row h3,
.experience-row p,
.experience-row time {
  margin: 0;
}

.experience-row h3 {
  font-size: 0.98rem;
  font-weight: 700;
}

.experience-row p,
.experience-row time {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.78rem;
}

.background-link {
  margin-top: 26px;
}

@media (max-width: 767px) {
  .about-summary {
    padding-block: 44px 58px;
  }

  h2 {
    margin: 24px 0 34px;
    font-size: clamp(1.9rem, 9vw, 2.5rem);
  }

  .experience-row {
    grid-template-columns: 1fr;
    gap: 2px;
    padding-block: 18px;
  }

  .experience-row time {
    margin-top: 6px;
  }
}
</style>
