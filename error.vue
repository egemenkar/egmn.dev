<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ title: notFound.value ? 'Page not found' : 'Something went wrong', robots: 'noindex' })
</script>

<template>
  <NuxtLayout>
    <section
      aria-labelledby="error-title"
    >
      <div>
        <h1
          id="error-title"
          class="out-head title"
        >
          {{ notFound ? 'Page not found' : 'Something went wrong' }}
        </h1>
        <p class="out-body muted">
          exit code {{ error.statusCode }}
        </p>
        <p class="back">
          <a
            href="/"
            @click.prevent="clearError({ redirect: '/' })"
          >cd ~</a>
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.title {
  font-weight: 700;
}

.back {
  margin-top: 20px;
}
</style>
