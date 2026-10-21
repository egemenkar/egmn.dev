<script setup lang="ts">
import type { Post } from '~/data/profile'

defineProps<{ posts: Post[] }>()
</script>

<template>
  <ol class="posts">
    <li
      v-for="post in posts"
      :key="post.href"
      class="post"
    >
      <time
        class="muted"
        :datetime="post.date"
      >{{ formatDate(post.date) }}</time>
      <h3><NuxtLink :to="post.href">{{ post.title }}</NuxtLink></h3>
      <p class="muted">
        {{ post.summary }}
      </p>
    </li>
  </ol>
</template>

<style scoped>
.posts {
  margin: 0;
  padding: 0;
  list-style: none;
}

.post {
  padding-block: 18px;
  border-bottom: 1px solid var(--color-rule);
}

.post:first-child {
  padding-top: 0;
}

.post:last-child {
  border-bottom: 0;
}

time {
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
}

h3 {
  margin-block: 2px 4px;
  font-weight: 700;
}

h3 a {
  text-decoration: none;
}

h3 a:hover {
  text-decoration: underline;
}
</style>
