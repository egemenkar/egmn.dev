<script setup>
const props = defineProps({
  project: { type: Object, required: true },
  active: { type: Boolean, default: false },
  expanded: { type: Boolean, default: false },
});

const emit = defineEmits(["activate", "toggle-preview"]);
const previewId = computed(() => `preview-${props.project.id}`);
</script>

<template>
  <article
    class="project-row"
    :class="{ 'is-active': active }"
    @mouseenter="emit('activate', project.id)"
    @focusin="emit('activate', project.id)"
  >
    <img
      v-if="project.icon"
      class="project-icon"
      :src="project.icon"
      :alt="project.iconAlt"
      width="72"
      height="72"
      loading="lazy"
    />
    <div v-else class="project-monogram" aria-hidden="true">
      {{ project.title.slice(0, 1) }}
    </div>

    <div class="project-copy">
      <a
        class="project-link focus-ring"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${project.destinationLabel} (${$t('home.work.newTab')})`"
      >
        <span class="project-name">{{ project.title }}</span>
        <span class="project-description">{{ project.description }}</span>
        <span class="project-category">{{ project.category }}</span>
        <span class="project-arrow" aria-hidden="true">↗</span>
      </a>

      <button
        v-if="project.preview"
        class="preview-button focus-ring"
        type="button"
        :aria-expanded="expanded"
        :aria-controls="previewId"
        @click="emit('toggle-preview', project.id)"
      >
        {{ expanded ? $t("home.work.closePreview") : $t("home.work.preview") }}
      </button>

      <div v-if="project.preview" v-show="expanded" :id="previewId" class="mobile-preview">
        <img
          :src="project.preview"
          :alt="project.previewAlt"
          width="442"
          height="960"
          loading="lazy"
        />
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-row {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 28px;
  align-items: center;
  min-height: 142px;
  border-bottom: 1px solid var(--color-divider);
}

.project-icon,
.project-monogram {
  width: 72px;
  height: 72px;
  border-radius: 19px;
}

.project-icon {
  object-fit: cover;
}

.project-monogram {
  display: grid;
  place-items: center;
  background: var(--color-surface);
  font-size: 1.6rem;
  font-weight: 800;
}

.project-copy {
  min-width: 0;
}

.project-link {
  position: relative;
  display: grid;
  padding: 21px 50px 21px 0;
  color: inherit;
  text-decoration: none;
}

.project-name {
  font-size: 1.34rem;
  font-weight: 780;
  letter-spacing: -0.04em;
  line-height: 1.2;
}

.project-description {
  margin-top: 2px;
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.45;
}

.project-category {
  margin-top: 7px;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  line-height: 1.4;
}

.project-arrow {
  position: absolute;
  top: 50%;
  right: 8px;
  color: var(--color-muted);
  font-size: 1.35rem;
  transform: translateY(-50%);
  transition: color 160ms ease, transform 160ms ease;
}

.project-link:hover .project-arrow,
.is-active .project-arrow {
  color: var(--color-accent);
  transform: translate(3px, -53%);
}

.preview-button,
.mobile-preview {
  display: none;
}

@media (max-width: 767px) {
  .project-row {
    grid-template-columns: 54px minmax(0, 1fr);
    gap: 18px;
    min-height: 126px;
    align-items: start;
    padding-block: 24px;
  }

  .project-icon,
  .project-monogram {
    width: 54px;
    height: 54px;
    border-radius: 15px;
  }

  .project-link {
    padding: 0 28px 0 0;
  }

  .project-name {
    font-size: 1.14rem;
  }

  .project-description {
    font-size: 0.94rem;
  }

  .project-arrow {
    top: 3px;
    right: 0;
    transform: none;
  }

  .project-link:hover .project-arrow,
  .is-active .project-arrow {
    transform: translateX(3px);
  }

  .preview-button {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    margin-top: 10px;
    padding: 0;
    border: 0;
    border-bottom: 1px solid currentColor;
    background: transparent;
    color: var(--color-muted);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    cursor: pointer;
  }

  .mobile-preview {
    display: block;
    padding: 18px 0 4px;
  }

  .mobile-preview img {
    width: min(210px, 100%);
    border-radius: 24px;
    box-shadow: var(--shadow-preview);
  }
}
</style>
