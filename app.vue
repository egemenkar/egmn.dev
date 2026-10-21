<script setup lang="ts">
import { education, experience, focusAreas, links, person, site } from '~/data/profile'

const ogImage = `${site.url}${site.ogImage}`

// Runs before first paint: marks JS as available (the menu needs it) and applies an explicit
// theme choice so the other palette never flashes.
const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('egmn-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': person.name,
  'url': site.url,
  'jobTitle': person.jobTitle,
  'description': site.description,
  'worksFor': { '@type': 'Organization', 'name': person.employer },
  'homeLocation': { '@type': 'Place', 'name': person.location },
  'email': `mailto:${person.email}`,
  'sameAs': [links.linkedin.href, links.github.href],
  'knowsAbout': focusAreas.map(({ title }) => title),
  'alumniOf': education
    .filter(({ expected }) => !expected)
    .map(({ institution }) => ({ '@type': 'CollegeOrUniversity', 'name': institution })),
  'hasOccupation': {
    '@type': 'Occupation',
    'name': experience[0]?.roles[0]?.title,
  },
}

useHead({
  htmlAttrs: { lang: 'en' },
  titleTemplate: title => title || site.title,
  link: [
    { rel: 'canonical', href: site.url },
    { rel: 'preload', href: '/fonts/jetbrains-mono-latin-wght-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
  meta: [
    { name: 'theme-color', content: '#f7f5f0', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#0f100f', media: '(prefers-color-scheme: dark)' },
  ],
  script: [
    { innerHTML: themeScript, tagPriority: 'critical' },
    { type: 'application/ld+json', innerHTML: JSON.stringify(personSchema) },
  ],
})

useSeoMeta({
  title: site.title,
  description: site.description,
  author: person.name,
  ogType: 'profile',
  ogSiteName: person.name,
  ogTitle: site.title,
  ogDescription: site.description,
  ogUrl: site.url,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${person.name}, ${person.headline}`,
  ogLocale: 'en_GB',
  profileFirstName: 'Egemen',
  profileLastName: 'Kar',
  twitterCard: 'summary_large_image',
  twitterTitle: site.title,
  twitterDescription: site.description,
  twitterImage: ogImage,
  twitterImageAlt: `${person.name}, ${person.headline}`,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
