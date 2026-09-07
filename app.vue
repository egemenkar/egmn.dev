<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (title) => title || "Egemen Kar | Frontend Lead & App Maker",
  meta: [
    {
      name: "description",
      content:
        "Frontend lead and independent app maker based in Istanbul. Explore my apps, work, and ideas.",
    },
    {
      property: "og:title",
      content: "Egemen Kar | Frontend Lead & App Maker",
    },
    {
      property: "og:description",
      content:
        "Frontend lead and independent app maker based in Istanbul. Explore my apps, work, and ideas.",
    },
  ],
});
</script>
