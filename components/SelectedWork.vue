<script setup>
import { featuredProjects } from "~/data/site.mjs";

const activeProjectId = ref(featuredProjects[0].id);
const expandedProjectIds = ref([]);

const activeProject = computed(
  () =>
    featuredProjects.find(({ id }) => id === activeProjectId.value) ||
    featuredProjects[0],
);

const togglePreview = (projectId) => {
  expandedProjectIds.value = expandedProjectIds.value.includes(projectId)
    ? expandedProjectIds.value.filter((id) => id !== projectId)
    : [...expandedProjectIds.value, projectId];
};
</script>

<template>
  <section id="work" class="selected-work" aria-labelledby="work-title">
    <div class="section-heading">
      <p id="work-title" class="section-label">{{ $t("home.work.label") }}</p>
      <NuxtLink class="all-projects-link" to="/projects">{{ $t("home.work.allProjects") }}</NuxtLink>
    </div>

    <div class="work-layout">
      <div class="project-list">
        <ProjectRow
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
          :active="activeProjectId === project.id"
          :expanded="expandedProjectIds.includes(project.id)"
          @activate="activeProjectId = $event"
          @toggle-preview="togglePreview"
        />
      </div>

      <div class="desktop-preview" aria-live="polite">
        <Transition name="preview" mode="out-in">
          <figure :key="activeProject.id" class="preview-figure motion-transform">
            <img
              :src="activeProject.preview"
              :alt="activeProject.previewAlt"
              width="442"
              height="960"
              loading="lazy"
            />
            <figcaption>{{ activeProject.title }}</figcaption>
          </figure>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.selected-work {
  padding-block: 50px 78px;
  border-bottom: 1px solid var(--color-divider);
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 14px;
}

.all-projects-link {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  text-underline-offset: 4px;
}

.all-projects-link:hover {
  color: var(--color-accent);
}

.work-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 56px;
  align-items: stretch;
}

.project-list {
  border-top: 1px solid var(--color-divider);
}

.desktop-preview {
  display: grid;
  min-height: 440px;
  place-items: center;
}

.preview-figure {
  position: relative;
  width: 205px;
  margin: 0;
  transform: rotate(4deg);
  transform-origin: center;
}

.preview-figure::before,
.preview-figure::after {
  position: absolute;
  width: 28px;
  height: 1px;
  background: var(--color-muted);
  content: "";
}

.preview-figure::before {
  top: 18%;
  left: -46px;
  transform: rotate(25deg);
}

.preview-figure::after {
  top: 13%;
  left: -40px;
  transform: rotate(72deg);
}

.preview-figure img {
  width: 100%;
  border-radius: 25px;
  box-shadow: var(--shadow-preview);
}

.preview-figure figcaption {
  position: absolute;
  right: -28px;
  bottom: -32px;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  transform: rotate(-4deg);
}

.preview-enter-active,
.preview-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.preview-enter-from,
.preview-leave-to {
  opacity: 0;
  transform: rotate(4deg) translateY(8px);
}

@media (max-width: 1023px) {
  .work-layout {
    grid-template-columns: minmax(0, 1fr) 220px;
    gap: 34px;
  }

  .preview-figure {
    width: 180px;
  }
}

@media (max-width: 879px) {
  .work-layout {
    grid-template-columns: 1fr;
  }

  .desktop-preview {
    display: none;
  }
}

@media (max-width: 767px) {
  .selected-work {
    padding-block: 40px 52px;
  }

  .section-heading {
    margin-bottom: 10px;
  }
}
</style>
