<script setup>
import { projects } from "~/data/site.mjs";

useSeoMeta({
  title: "Projects | Egemen Kar",
  description:
    "Selected independent apps and web projects by frontend lead and app maker Egemen Kar.",
});
</script>

<template>
  <div class="page-container detail-page projects-page">
    <header class="detail-header">
      <p class="section-label">{{ $t("projectsPage.label") }}</p>
      <h1 class="detail-title">{{ $t("projectsPage.title") }}</h1>
      <p class="detail-intro">{{ $t("projectsPage.intro") }}</p>
    </header>

    <section class="detail-section" aria-labelledby="projects-title">
      <h2 id="projects-title" class="visually-hidden">{{ $t("projectsPage.title") }}</h2>
      <div class="projects-list">
        <article v-for="(project, index) in projects" :key="project.id" class="project-item">
          <div class="project-number" aria-hidden="true">
            {{ String(index + 1).padStart(2, "0") }}
          </div>
          <ProjectIconReveal
            v-if="project.icon"
            class="project-icon"
            :project="project"
          />
          <div v-else class="project-monogram" aria-hidden="true">
            {{ project.title.slice(0, 1) }}
          </div>
          <div class="project-copy">
            <p class="project-category">{{ project.category }}</p>
            <h3>{{ project.title }}</h3>
            <p>{{ project.detailDescription }}</p>
            <a
              class="text-link"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${project.destinationLabel} (${$t('projectsPage.newTab')})`"
            >
              {{ project.destinationLabel }} ↗
            </a>
          </div>
          <img
            v-if="project.preview"
            class="project-preview motion-transform"
            :src="project.preview"
            :alt="project.previewAlt"
            width="442"
            height="960"
            loading="lazy"
          />
        </article>
      </div>
    </section>

    <ContactFooter />
  </div>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.projects-list {
  border-top: 1px solid var(--color-divider);
}

.project-item {
  display: grid;
  grid-template-columns: 36px 88px minmax(0, 1fr) 100px;
  gap: 26px;
  align-items: center;
  min-height: 218px;
  padding-block: 28px;
  border-bottom: 1px solid var(--color-divider);
}

.project-number,
.project-category {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

.project-icon,
.project-monogram {
  width: 88px;
  height: 88px;
  border-radius: 22px;
}

.project-monogram {
  display: grid;
  place-items: center;
  background: var(--color-surface);
  font-size: 1.8rem;
  font-weight: 800;
}

.project-category,
.project-copy p,
.project-copy h3 {
  margin: 0;
}

.project-copy h3 {
  margin-top: 4px;
  font-size: 1.5rem;
  font-weight: 780;
  letter-spacing: -0.04em;
}

.project-copy > p:not(.project-category) {
  max-width: 600px;
  margin-top: 5px;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.project-copy .text-link {
  margin-top: 14px;
}

.project-preview {
  width: 82px;
  max-height: 178px;
  border-radius: 12px;
  object-fit: cover;
  object-position: top;
  box-shadow: var(--shadow-preview);
  transform: rotate(3deg);
}

.detail-section + .contact-footer {
  margin-top: 20px;
}

@media (max-width: 767px) {
  .project-item {
    grid-template-columns: 28px 60px minmax(0, 1fr);
    gap: 16px;
    min-height: 0;
    align-items: start;
    padding-block: 24px;
  }

  .project-icon,
  .project-monogram {
    width: 60px;
    height: 60px;
    border-radius: 16px;
  }

  .project-preview {
    display: none;
  }

  .project-copy h3 {
    font-size: 1.25rem;
  }

  .project-copy > p:not(.project-category) {
    font-size: 0.9rem;
  }
}

@media (max-width: 389px) {
  .project-item {
    grid-template-columns: 52px minmax(0, 1fr);
  }

  .project-number {
    display: none;
  }

  .project-icon,
  .project-monogram {
    width: 52px;
    height: 52px;
  }
}
</style>
