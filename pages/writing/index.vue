<script setup lang="ts">
import { person, posts, site } from '~/data/profile'

if (!posts.length) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const description = `Notes by ${person.name} on AI-native frontend engineering, architecture and delivery.`

useSeoMeta({
  title: `Writing — ${person.name}`,
  description,
  ogTitle: `Writing — ${person.name}`,
  ogDescription: description,
  ogUrl: `${site.url}/writing`,
})
useHead({ link: [{ rel: 'canonical', href: `${site.url}/writing` }] })
</script>

<template>
  <section
    aria-labelledby="writing-title"
  >
    <div>
      <p class="muted">
        <NuxtLink to="/">
          cd ~
        </NuxtLink>
      </p>
      <h1
        id="writing-title"
        class="out-head title"
      >
        Writing
      </h1>
      <p class="out-body muted intro">
        {{ description }}
      </p>
      <PostList :posts="posts" />
    </div>
  </section>
</template>

<style scoped>
.title {
  margin-top: 18px;
  font-weight: 700;
}

.intro {
  margin-bottom: 24px;
}
</style>
