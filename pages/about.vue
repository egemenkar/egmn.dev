<script setup>
import { education, experience } from "~/data/site.mjs";

useSeoMeta({
  title: "About | Egemen Kar",
  description:
    "Work experience and education for Egemen Kar, a frontend lead and independent app maker in Istanbul.",
});
</script>

<template>
  <div class="page-container detail-page about-page">
    <header class="detail-header">
      <p class="section-label">{{ $t("aboutPage.label") }}</p>
      <h1 class="detail-title">{{ $t("aboutPage.title") }}</h1>
      <p class="detail-intro">{{ $t("aboutPage.intro") }}</p>
    </header>

    <section class="detail-section" aria-labelledby="work-experience-title">
      <h2 id="work-experience-title">{{ $t("aboutPage.workTitle") }}</h2>
      <div class="timeline">
        <article
          v-for="item in experience"
          :key="`${item.company}-${item.role}`"
          class="timeline-item"
        >
          <div class="timeline-heading">
            <div>
              <h3>{{ item.company }}</h3>
              <p class="role">{{ item.role }}</p>
            </div>
            <div class="timeline-meta">
              <time>{{ item.period }}</time>
              <span>{{ item.location }}</span>
            </div>
          </div>
          <ul>
            <li v-for="responsibility in item.responsibilities" :key="responsibility">
              {{ responsibility }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="detail-section" aria-labelledby="education-title">
      <h2 id="education-title">{{ $t("aboutPage.educationTitle") }}</h2>
      <div class="education-list">
        <article v-for="item in education" :key="item.institution" class="education-item">
          <div>
            <h3>{{ item.institution }}</h3>
            <p>{{ item.degree }}</p>
          </div>
          <div class="education-meta">
            <time>{{ item.year }}</time>
            <span>{{ item.location }}</span>
          </div>
        </article>
      </div>
    </section>

    <ContactFooter />
  </div>
</template>

<style scoped>
.timeline,
.education-list {
  border-top: 1px solid var(--color-divider);
}

.timeline-item,
.education-item {
  border-bottom: 1px solid var(--color-divider);
  padding-block: 28px;
}

.timeline-heading,
.education-item {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(230px, 0.8fr);
  gap: 40px;
}

.timeline h3,
.education-item h3,
.timeline p,
.education-item p {
  margin: 0;
}

.timeline h3,
.education-item h3 {
  font-size: 1.18rem;
  font-weight: 760;
  letter-spacing: -0.025em;
}

.role,
.education-item p {
  margin-top: 3px !important;
  color: var(--color-muted);
}

.timeline-meta,
.education-meta {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  text-align: right;
}

.timeline-item ul {
  max-width: 720px;
  margin: 22px 0 0;
  padding-left: 1.1rem;
  color: var(--color-muted);
  font-size: 0.94rem;
}

.timeline-item li + li {
  margin-top: 7px;
}

.detail-section + .contact-footer {
  margin-top: 20px;
}

@media (max-width: 767px) {
  .timeline-heading,
  .education-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .timeline-meta,
  .education-meta {
    align-items: flex-start;
    text-align: left;
  }
}
</style>
