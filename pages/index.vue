<template>
  <div class="page-container home-page">
    <IntroHero />
    <SelectedWork />
    <AboutSummary />
    <ContactFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});

useSeoMeta({
  title: "Egemen Kar | Frontend Lead & App Maker",
  description:
    "Frontend lead and independent app maker based in Istanbul. Explore my apps, work, and ideas.",
  ogTitle: "Egemen Kar | Frontend Lead & App Maker",
  ogDescription:
    "Frontend lead and independent app maker based in Istanbul. Explore my apps, work, and ideas.",
});
</script>
