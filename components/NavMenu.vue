<script setup>
const links = [{
  label: 'Egemen Kar',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/85014459?v=4',
  },
  // badge: 'Frontend Developer',
  to: '/'
}, {
  label: 'About me',
  icon: 'i-heroicons-identification',
  iconClass: 'text-red-400',
  to: '/about-me'
}, {
  label: 'Projects',
  icon: 'i-heroicons-code-bracket',
  iconClass: 'text-red-400',
  to: '/projects'
}]
</script>

<template>
  <UVerticalNavigation :links="links" class="border-r border-gray-600 h-screen pr-4 py-4 flex flex-col justify-center">
  <template #default="{ link }">
      <div class="relative text-left w-full">
        <div>
          {{ link.label }}
        </div>
      </div>
  </template>

  <template #icon="{ link }">

      <UIcon :name="link.icon" class="text-xl relative text-right w-full" />

    </template>

    <template #avatar="{ link }">
      <UAvatar
        v-if="link.avatar"
        v-bind="link.avatar"
        class="text-right w-1/2"
        size="xl"
      />
    </template>

  </UVerticalNavigation>
</template>
